# Accessibility Notes

## Comparison with shadcn/ui

### Dialog / Modal

1. My Modal manually implements focus trapping using `Tab` and `Shift + Tab`. shadcn/ui uses the Base UI Dialog primitive, which handles the dialog focus behavior for me.

2. My Modal is a single fixed component. shadcn/ui provides reusable components such as `DialogTrigger`, `DialogClose`, `DialogTitle`, `DialogDescription`, `DialogHeader`, and `DialogFooter`.

3. shadcn/ui provides an accessible close button with a screen-reader-only "Close" label. My Modal uses a visible text button instead.

### Tabs

4. My Tabs manually implements keyboard navigation for `ArrowLeft`, `ArrowRight`, `Home`, and `End`. shadcn/ui delegates the tab behavior to the Base UI Tabs primitive.

5. My Tabs implementation supports only a basic horizontal layout. shadcn/ui supports additional features such as horizontal/vertical orientation, variants, and disabled tabs.

6. shadcn/ui includes more detailed `focus-visible` styling, making keyboard focus more clearly visible.

## What I Learned

Building these components manually helped me understand the ARIA patterns and keyboard interactions instead of relying completely on a component library. The shadcn/ui implementation provides more reusable and robust accessibility behavior, especially for focus management and keyboard interactions.