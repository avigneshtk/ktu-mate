import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AviguChat from "@/components/AviguChat";

const mockSendMessage = vi.fn();
const mockStop = vi.fn();
const mockRegenerate = vi.fn();
const mockClearError = vi.fn();

const mockUseChat = vi.fn();

vi.mock("@ai-sdk/react", () => ({
  useChat: () => mockUseChat(),
}));

vi.mock("ai", () => ({
  DefaultChatTransport: vi.fn(),
}));

function createChatState(
  overrides: Record<string, unknown> = {}
) {
  return {
    messages: [],
    sendMessage: mockSendMessage,
    status: "ready",
    stop: mockStop,
    error: undefined,
    regenerate: mockRegenerate,
    clearError: mockClearError,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();

  mockUseChat.mockReturnValue(
    createChatState()
  );
});

describe("AviguChat", () => {
  it("shows the empty state when there are no messages", () => {
    render(<AviguChat />);

    expect(
      screen.getByRole("heading", { name: "Hi! I'm Avigu" })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Ask Avigu something...")
    ).toBeInTheDocument();
  });

  it("fills the input when an example prompt is clicked", async () => {
    const user = userEvent.setup();

    render(<AviguChat />);

    const input = screen.getByPlaceholderText(
      "Ask Avigu something..."
    );

    await user.click(
      screen.getByRole("button", {
        name: /Check my DSA progress/i,
      })
    );

    expect(input).toHaveValue(
      "What's my DSA progress?"
    );
  });

  it("renders user and Avigu text messages", () => {
    mockUseChat.mockReturnValue(
      createChatState({
        messages: [
          {
            id: "user-1",
            role: "user",
            parts: [
              {
                type: "text",
                text: "What is a stack?",
              },
            ],
          },
          {
            id: "assistant-1",
            role: "assistant",
            parts: [
              {
                type: "text",
                text: "A stack follows the LIFO principle.",
              },
            ],
          },
        ],
      })
    );

    render(<AviguChat />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Avigu")).toBeInTheDocument();

    expect(
      screen.getByText("What is a stack?")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "A stack follows the LIFO principle."
      )
    ).toBeInTheDocument();
  });

  it("renders Markdown links in assistant messages", () => {
    mockUseChat.mockReturnValue(
      createChatState({
        messages: [
          {
            id: "assistant-1",
            role: "assistant",
            parts: [
              {
                type: "text",
                text: "[KTU](https://ktu.edu.in)",
              },
            ],
          },
        ],
      })
    );

    render(<AviguChat />);

    const link = screen.getByRole("link", {
      name: "KTU",
    });

    expect(link).toHaveAttribute(
      "href",
      "https://ktu.edu.in"
    );

    expect(link).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  it("renders the pending state with a loading skeleton", () => {
    mockUseChat.mockReturnValue(
      createChatState({
        status: "submitted",
      })
    );

    render(<AviguChat />);

    expect(
      screen.getByRole("button", { name: "Stop" })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "Ask Avigu something..."
      )
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: "Send" })
    ).toBeDisabled();
  });

  it("renders the streaming state with Stop control", () => {
    mockUseChat.mockReturnValue(
      createChatState({
        status: "streaming",
        messages: [
          {
            id: "assistant-1",
            role: "assistant",
            parts: [
              {
                type: "text",
                text: "I am still generating...",
              },
            ],
          },
        ],
      })
    );

    render(<AviguChat />);

    expect(
      screen.getByText("I am still generating...")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Stop" })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "Ask Avigu something..."
      )
    ).toBeDisabled();
  });

  it("renders the error state with a retry button", () => {
    mockUseChat.mockReturnValue(
      createChatState({
        error: new Error("API failed"),
      })
    );

    render(<AviguChat />);

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Avigu couldn't complete that response. Please try again."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Try again",
      })
    ).toBeInTheDocument();
  });

  it("calls retry when Try again is clicked", async () => {
    const user = userEvent.setup();

    mockUseChat.mockReturnValue(
      createChatState({
        error: new Error("API failed"),
      })
    );

    render(<AviguChat />);

    await user.click(
      screen.getByRole("button", {
        name: "Try again",
      })
    );

    expect(mockClearError).toHaveBeenCalledTimes(1);
    expect(mockRegenerate).toHaveBeenCalledTimes(1);
  });

  it("sends a message when the form is submitted", async () => {
    const user = userEvent.setup();

    render(<AviguChat />);

    const input = screen.getByPlaceholderText(
      "Ask Avigu something..."
    );

    await user.type(input, "Explain binary search");

    await user.click(
      screen.getByRole("button", { name: "Send" })
    );

    expect(mockClearError).toHaveBeenCalledTimes(1);

    expect(mockSendMessage).toHaveBeenCalledWith({
      text: "Explain binary search",
    });
  });

  it("ignores empty input", async () => {
    const user = userEvent.setup();

    render(<AviguChat />);

    const sendButton = screen.getByRole("button", {
      name: "Send",
    });

    expect(sendButton).toBeDisabled();

    await user.click(sendButton);

    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});