export type DsaProblem = {
  id: string;
  title: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  platform: string;
  url: string;
};

export const dsaProblems: DsaProblem[] = [
  // Arrays
  {
    id: "two-sum",
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    topic: "Arrays",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/maximum-subarray/",
  },

  // Strings
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    topic: "Strings",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/valid-anagram/",
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    topic: "Strings",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/valid-palindrome/",
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    topic: "Strings",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },

  // Linked Lists
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    topic: "Linked Lists",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    topic: "Linked Lists",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },

  // Stacks
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    topic: "Stacks",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: "min-stack",
    title: "Min Stack",
    topic: "Stacks",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/min-stack/",
  },

  // Queues
  {
    id: "number-of-islands",
    title: "Number of Islands",
    topic: "Graphs",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/number-of-islands/",
  },

  // Searching
  {
    id: "binary-search",
    title: "Binary Search",
    topic: "Searching",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/binary-search/",
  },
  {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    topic: "Searching",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },

  // Sorting
  {
    id: "sort-an-array",
    title: "Sort an Array",
    topic: "Sorting",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/sort-an-array/",
  },

  // Trees
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    topic: "Trees",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    topic: "Trees",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  },

  // Dynamic Programming
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/climbing-stairs/",
  },
  {
    id: "house-robber",
    title: "House Robber",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/house-robber/",
  },

  // Recursion
  {
    id: "fibonacci-number",
    title: "Fibonacci Number",
    topic: "Recursion",
    difficulty: "Easy",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/fibonacci-number/",
  },
];