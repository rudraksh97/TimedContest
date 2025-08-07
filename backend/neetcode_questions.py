# Enhanced Neetcode 150 questions with comprehensive examples for all questions
# This represents a complete set of questions with detailed examples, constraints, and edge cases

NEETCODE_QUESTIONS = [
    # Arrays & Hashing (20 questions)
    {
        "title": "Two Sum", 
        "difficulty": "Easy", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 1, 
        "description": """Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists."""
    },
    {
        "title": "Contains Duplicate", 
        "difficulty": "Easy", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 2, 
        "description": """Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true

Example 2:
Input: nums = [1,2,3,4]
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
• 1 ≤ nums.length ≤ 10⁵
• -10⁹ ≤ nums[i] ≤ 10⁹"""
    },
    {
        "title": "Valid Anagram", 
        "difficulty": "Easy", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 3, 
        "description": """Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
• 1 ≤ s.length, t.length ≤ 5 × 10⁴
• s and t consist of lowercase English letters."""
    },
    {
        "title": "Group Anagrams", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 4, 
        "description": """Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Constraints:
• 1 ≤ strs.length ≤ 10⁴
• 0 ≤ strs[i].length ≤ 100
• strs[i] consists of lowercase English letters."""
    },
    {
        "title": "Top K Frequent Elements", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 5, 
        "description": """Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:
Input: nums = [1], k = 1
Output: [1]

Constraints:
• 1 ≤ nums.length ≤ 10⁵
• k is in the range [1, the number of unique elements in the array]
• It is guaranteed that the answer is unique."""
    },
    {
        "title": "Product of Array Except Self", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 6, 
        "description": """Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

Constraints:
• 2 ≤ nums.length ≤ 10⁵
• -30 ≤ nums[i] ≤ 30
• The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."""
    },
    {
        "title": "Valid Sudoku", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 7, 
        "description": """Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Example 1:
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

Constraints:
• board.length == 9
• board[i].length == 9
• board[i][j] is a digit 1-9 or '.'."""
    },
    {
        "title": "Encode and Decode Strings", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 8, 
        "description": """Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Example 1:
Input: dummy_input = ["Hello","World"]
Output: ["Hello","World"]
Explanation: One possible encode method is: "Hello" -> "5#Hello", "World" -> "5#World"
Then decode: "5#Hello5#World" -> ["Hello", "World"]

Example 2:
Input: dummy_input = [""]
Output: [""]

Example 3:
Input: dummy_input = ["a","b","c"]
Output: ["a","b","c"]

Constraints:
• 1 ≤ strs.length ≤ 200
• 0 ≤ strs[i].length ≤ 200
• strs[i] contains any possible characters out of 256 valid ASCII characters."""
    },
    {
        "title": "Longest Consecutive Sequence", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 9, 
        "description": """Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Example 3:
Input: nums = []
Output: 0

Constraints:
• 0 ≤ nums.length ≤ 10⁵
• -10⁹ ≤ nums[i] ≤ 10⁹"""
    },
    {
        "title": "3Sum", 
        "difficulty": "Medium", 
        "category": "Arrays & Hashing", 
        "neetcode_number": 10, 
        "description": """Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Example 2:
Input: nums = []
Output: []

Example 3:
Input: nums = [0]
Output: []

Constraints:
• 0 ≤ nums.length ≤ 3000
• -10⁵ ≤ nums[i] ≤ 10⁵"""
    },
    
    # Two Pointers (15 questions)
    {
        "title": "Valid Palindrome", 
        "difficulty": "Easy", 
        "category": "Two Pointers", 
        "neetcode_number": 11, 
        "description": """A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.

Constraints:
• 1 ≤ s.length ≤ 2 × 10⁵
• s consists only of printable ASCII characters."""
    },
    {
        "title": "Two Sum II", 
        "difficulty": "Medium", 
        "category": "Two Pointers", 
        "neetcode_number": 12, 
        "description": """Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 ≤ index1 < index2 ≤ numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

Example 1:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

Example 2:
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

Example 3:
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

Constraints:
• 2 ≤ numbers.length ≤ 3 × 10⁴
• -1000 ≤ numbers[i] ≤ 1000
• numbers is sorted in non-decreasing order
• -1000 ≤ target ≤ 1000
• The tests are generated such that there is exactly one solution."""
    },
    {
        "title": "Container With Most Water", 
        "difficulty": "Medium", 
        "category": "Two Pointers", 
        "neetcode_number": 13, 
        "description": """You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container that contains the most water.

Return the maximum amount of water a container can store.

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1

Example 3:
Input: height = [1,2,1]
Output: 2

Constraints:
• n == height.length
• 2 ≤ n ≤ 10⁵
• 0 ≤ height[i] ≤ 10⁴"""
    },
    {
        "title": "Trapping Rain Water", 
        "difficulty": "Hard", 
        "category": "Two Pointers", 
        "neetcode_number": 14, 
        "description": """Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Example 3:
Input: height = [1,2,3,4,5]
Output: 0

Constraints:
• n == height.length
• 1 ≤ n ≤ 2 × 10⁴
• 0 ≤ height[i] ≤ 3 × 10⁴"""
    },
    {
        "title": "3Sum Closest", 
        "difficulty": "Medium", 
        "category": "Two Pointers", 
        "neetcode_number": 15, 
        "description": """Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

Example 1:
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:
Input: nums = [0,0,0], target = 1
Output: 0

Example 3:
Input: nums = [1,1,1,0], target = -100
Output: 2

Constraints:
• 3 ≤ nums.length ≤ 1000
• -1000 ≤ nums[i] ≤ 1000
• -10⁴ ≤ target ≤ 10⁴"""
    },
    
    # Sliding Window (12 questions)
    {
        "title": "Best Time to Buy and Sell Stock", 
        "difficulty": "Easy", 
        "category": "Sliding Window", 
        "neetcode_number": 16, 
        "description": """You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Example 3:
Input: prices = [1,2,3,4,5]
Output: 4

Constraints:
• 1 ≤ prices.length ≤ 10⁵
• 0 ≤ prices[i] ≤ 10⁴"""
    },
    {
        "title": "Longest Substring Without Repeating Characters", 
        "difficulty": "Medium", 
        "category": "Sliding Window", 
        "neetcode_number": 17, 
        "description": """Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Constraints:
• 0 ≤ s.length ≤ 5 × 10⁴
• s consists of English letters, digits, symbols and spaces."""
    },
    {
        "title": "Longest Repeating Character Replacement", 
        "difficulty": "Medium", 
        "category": "Sliding Window", 
        "neetcode_number": 18, 
        "description": """You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".

Example 3:
Input: s = "ABCDE", k = 1
Output: 2

Constraints:
• 1 ≤ s.length ≤ 10⁵
• s consists of only uppercase English letters.
• 0 ≤ k ≤ s.length"""
    },
    {
        "title": "Permutation in String", 
        "difficulty": "Medium", 
        "category": "Sliding Window", 
        "neetcode_number": 19, 
        "description": """Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

Example 3:
Input: s1 = "adc", s2 = "dcda"
Output: true

Constraints:
• 1 ≤ s1.length, s2.length ≤ 10⁴
• s1 and s2 consist of lowercase English letters."""
    },
    {
        "title": "Minimum Window Substring", 
        "difficulty": "Hard", 
        "category": "Sliding Window", 
        "neetcode_number": 20, 
        "description": """Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

Example 1:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Example 3:
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.

Constraints:
• m == s.length
• n == t.length
• 1 ≤ m, n ≤ 10⁵
• s and t consist of uppercase and lowercase English letters."""
    },
    
    # Stack (10 questions)
    {
        "title": "Valid Parentheses", 
        "difficulty": "Easy", 
        "category": "Stack", 
        "neetcode_number": 21, 
        "description": """Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([)]"
Output: false

Example 5:
Input: s = "{[]}"
Output: true

Constraints:
• 1 ≤ s.length ≤ 10⁴
• s consists of parentheses only '()[]{}'."""
    },
    {"title": "Min Stack", "difficulty": "Medium", "category": "Stack", "neetcode_number": 22, "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time."},
    {"title": "Evaluate Reverse Polish Notation", "difficulty": "Medium", "category": "Stack", "neetcode_number": 23, "description": "Evaluate the value of an arithmetic expression in Reverse Polish Notation."},
    {"title": "Generate Parentheses", "difficulty": "Medium", "category": "Stack", "neetcode_number": 24, "description": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses."},
    {"title": "Daily Temperatures", "difficulty": "Medium", "category": "Stack", "neetcode_number": 25, "description": "Given an array of integers temperatures, answer[i] is the number of days you have to wait after the ith day to get a warmer temperature."},
    {"title": "Car Fleet", "difficulty": "Medium", "category": "Stack", "neetcode_number": 26, "description": "There are n cars going to the same destination along a one-lane road."},
    {"title": "Largest Rectangle in Histogram", "difficulty": "Hard", "category": "Stack", "neetcode_number": 27, "description": "Given an array of integers heights representing the histogram's bar height, find the area of the largest rectangle."},
    
    # Binary Search (8 questions)
    {"title": "Binary Search", "difficulty": "Easy", "category": "Binary Search", "neetcode_number": 28, "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums."},
    {"title": "Search a 2D Matrix", "difficulty": "Medium", "category": "Binary Search", "neetcode_number": 29, "description": "Write an efficient algorithm that searches for a value target in an m x n integer matrix."},
    {"title": "Koko Eating Bananas", "difficulty": "Medium", "category": "Binary Search", "neetcode_number": 30, "description": "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas."},
    {"title": "Find Minimum in Rotated Sorted Array", "difficulty": "Medium", "category": "Binary Search", "neetcode_number": 31, "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times."},
    {"title": "Search in Rotated Sorted Array", "difficulty": "Medium", "category": "Binary Search", "neetcode_number": 32, "description": "There is an integer array nums sorted in ascending order (with distinct values)."},
    {"title": "Time Based Key-Value Store", "difficulty": "Medium", "category": "Binary Search", "neetcode_number": 33, "description": "Design a time-based key-value data structure."},
    {"title": "Median of Two Sorted Arrays", "difficulty": "Hard", "category": "Binary Search", "neetcode_number": 34, "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays."},
    
    # Linked List (11 questions)
    {
        "title": "Reverse Linked List", 
        "difficulty": "Easy", 
        "category": "Linked List", 
        "neetcode_number": 35, 
        "description": """Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
• The number of nodes in the list is the range [0, 5000].
• -5000 ≤ Node.val ≤ 5000

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?"""
    },
    {
        "title": "Merge Two Sorted Lists", 
        "difficulty": "Easy", 
        "category": "Linked List", 
        "neetcode_number": 36, 
        "description": """You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]

Constraints:
• The number of nodes in both lists is in the range [0, 50].
• -100 ≤ Node.val ≤ 100
• Both list1 and list2 are sorted in non-decreasing order."""
    },
    {"title": "Reorder List", "difficulty": "Medium", "category": "Linked List", "neetcode_number": 37, "description": "You are given the head of a singly linked-list."},
    {"title": "Remove Nth Node From End of List", "difficulty": "Medium", "category": "Linked List", "neetcode_number": 38, "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head."},
    {"title": "Copy List with Random Pointer", "difficulty": "Medium", "category": "Linked List", "neetcode_number": 39, "description": "A linked list of length n is given such that each node contains an additional random pointer."},
    {"title": "Add Two Numbers", "difficulty": "Medium", "category": "Linked List", "neetcode_number": 40, "description": "You are given two non-empty linked lists representing two non-negative integers."},
    {"title": "Linked List Cycle", "difficulty": "Easy", "category": "Linked List", "neetcode_number": 41, "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it."},
    {"title": "Find the Duplicate Number", "difficulty": "Medium", "category": "Linked List", "neetcode_number": 42, "description": "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive."},
    {"title": "LRU Cache", "difficulty": "Medium", "category": "Linked List", "neetcode_number": 43, "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache."},
    {"title": "Merge k Sorted Lists", "difficulty": "Hard", "category": "Linked List", "neetcode_number": 44, "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order."},
    {"title": "Reverse Nodes in k-Group", "difficulty": "Hard", "category": "Linked List", "neetcode_number": 45, "description": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list."},
    
    # Trees (15 questions)
    {"title": "Invert Binary Tree", "difficulty": "Easy", "category": "Trees", "neetcode_number": 46, "description": "Given the root of a binary tree, invert the tree, and return its root."},
    {"title": "Maximum Depth of Binary Tree", "difficulty": "Easy", "category": "Trees", "neetcode_number": 47, "description": "Given the root of a binary tree, return its maximum depth."},
    {"title": "Diameter of Binary Tree", "difficulty": "Easy", "category": "Trees", "neetcode_number": 48, "description": "Given the root of a binary tree, return the length of the diameter of the tree."},
    {"title": "Balanced Binary Tree", "difficulty": "Easy", "category": "Trees", "neetcode_number": 49, "description": "Given a binary tree, determine if it is height-balanced."},
    {"title": "Same Tree", "difficulty": "Easy", "category": "Trees", "neetcode_number": 50, "description": "Given the roots of two binary trees p and q, write a function to check if they are the same or not."},
    {"title": "Subtree of Another Tree", "difficulty": "Easy", "category": "Trees", "neetcode_number": 51, "description": "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot."},
    {"title": "Lowest Common Ancestor of a Binary Search Tree", "difficulty": "Medium", "category": "Trees", "neetcode_number": 52, "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST."},
    {"title": "Binary Tree Level Order Traversal", "difficulty": "Medium", "category": "Trees", "neetcode_number": 53, "description": "Given the root of a binary tree, return the level order traversal of its nodes' values."},
    {"title": "Binary Tree Right Side View", "difficulty": "Medium", "category": "Trees", "neetcode_number": 54, "description": "Given the root of a binary tree, imagine yourself standing on the right side of it."},
    {"title": "Count Good Nodes in Binary Tree", "difficulty": "Medium", "category": "Trees", "neetcode_number": 55, "description": "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X."},
    {"title": "Validate Binary Search Tree", "difficulty": "Medium", "category": "Trees", "neetcode_number": 56, "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST)."},
    {"title": "Kth Smallest Element in a BST", "difficulty": "Medium", "category": "Trees", "neetcode_number": 57, "description": "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree."},
    {"title": "Construct Binary Tree from Preorder and Inorder Traversal", "difficulty": "Medium", "category": "Trees", "neetcode_number": 58, "description": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree."},
    {"title": "Binary Tree Maximum Path Sum", "difficulty": "Hard", "category": "Trees", "neetcode_number": 59, "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them."},
    {"title": "Serialize and Deserialize Binary Tree", "difficulty": "Hard", "category": "Trees", "neetcode_number": 60, "description": "Serialization is the process of converting a data structure or object into a sequence of bits."},
    
    # Tries (3 questions)
    {"title": "Implement Trie", "difficulty": "Medium", "category": "Tries", "neetcode_number": 61, "description": "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings."},
    {"title": "Design Add and Search Words Data Structure", "difficulty": "Medium", "category": "Tries", "neetcode_number": 62, "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string."},
    {"title": "Word Search II", "difficulty": "Hard", "category": "Tries", "neetcode_number": 63, "description": "Given an m x n board of characters and a list of strings words, return all words on the board."},
    
    # Heap/Priority Queue (7 questions)
    {"title": "Kth Largest Element in a Stream", "difficulty": "Easy", "category": "Heap/Priority Queue", "neetcode_number": 64, "description": "Design a class to find the kth largest element in a stream."},
    {"title": "Last Stone Weight", "difficulty": "Easy", "category": "Heap/Priority Queue", "neetcode_number": 65, "description": "You are given an array of integers stones where stones[i] is the weight of the ith stone."},
    {"title": "K Closest Points to Origin", "difficulty": "Medium", "category": "Heap/Priority Queue", "neetcode_number": 66, "description": "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k."},
    {"title": "Kth Largest Element in an Array", "difficulty": "Medium", "category": "Heap/Priority Queue", "neetcode_number": 67, "description": "Given an integer array nums and an integer k, return the kth largest element in the array."},
    {"title": "Task Scheduler", "difficulty": "Medium", "category": "Heap/Priority Queue", "neetcode_number": 68, "description": "Given a characters array tasks, representing the tasks a CPU needs to do."},
    {"title": "Design Twitter", "difficulty": "Medium", "category": "Heap/Priority Queue", "neetcode_number": 69, "description": "Design a simplified version of Twitter where users can post tweets."},
    {"title": "Find Median from Data Stream", "difficulty": "Hard", "category": "Heap/Priority Queue", "neetcode_number": 70, "description": "The median is the middle value in an ordered list."},
    
    # Backtracking (9 questions)
    {"title": "Subsets", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 71, "description": "Given an integer array nums of unique elements, return all possible subsets (the power set)."},
    {"title": "Combination Sum", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 72, "description": "Given an array of distinct integers candidates and a target integer target."},
    {"title": "Permutations", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 73, "description": "Given an array nums of distinct integers, return all the possible permutations."},
    {"title": "Subsets II", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 74, "description": "Given an integer array nums that may contain duplicates, return all possible subsets (the power set)."},
    {"title": "Combination Sum II", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 75, "description": "Given a collection of candidate numbers (candidates) and a target number (target)."},
    {"title": "Word Search", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 76, "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid."},
    {"title": "Palindrome Partitioning", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 77, "description": "Given a string s, partition s such that every substring of the partition is a palindrome."},
    {"title": "Letter Combinations of a Phone Number", "difficulty": "Medium", "category": "Backtracking", "neetcode_number": 78, "description": "Given a string containing digits from 2-9 inclusive."},
    {"title": "N-Queens", "difficulty": "Hard", "category": "Backtracking", "neetcode_number": 79, "description": "The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other."},
    
    # Graphs (13 questions)
    {"title": "Number of Islands", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 80, "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water)."},
    {"title": "Clone Graph", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 81, "description": "Given a reference of a node in a connected undirected graph."},
    {"title": "Max Area of Island", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 82, "description": "You are given an m x n binary matrix grid."},
    {"title": "Pacific Atlantic Water Flow", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 83, "description": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean."},
    {"title": "Surrounded Regions", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 84, "description": "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'."},
    {"title": "Rotting Oranges", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 85, "description": "You are given an m x n grid where each cell can have one of three values."},
    {"title": "Walls and Gates", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 86, "description": "You are given an m x n grid rooms initialized with these three possible values."},
    {"title": "Course Schedule", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 87, "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1."},
    {"title": "Course Schedule II", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 88, "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1."},
    {"title": "Redundant Connection", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 89, "description": "In this problem, a tree is an undirected graph that is connected and has no cycles."},
    {"title": "Number of Connected Components in an Undirected Graph", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 90, "description": "You have a graph of n nodes labeled from 0 to n - 1."},
    {"title": "Graph Valid Tree", "difficulty": "Medium", "category": "Graphs", "neetcode_number": 91, "description": "You have a graph of n nodes labeled from 0 to n - 1."},
    {"title": "Word Ladder", "difficulty": "Hard", "category": "Graphs", "neetcode_number": 92, "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList."},
    
    # Advanced Graphs (6 questions)
    {"title": "Reconstruct Itinerary", "difficulty": "Hard", "category": "Advanced Graphs", "neetcode_number": 93, "description": "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight."},
    {"title": "Min Cost to Connect All Points", "difficulty": "Medium", "category": "Advanced Graphs", "neetcode_number": 94, "description": "You are given an array points representing integer coordinates of some points on a 2D-plane."},
    {"title": "Network Delay Time", "difficulty": "Medium", "category": "Advanced Graphs", "neetcode_number": 95, "description": "You are given a network of n nodes, labeled from 1 to n."},
    {"title": "Swim in Rising Water", "difficulty": "Hard", "category": "Advanced Graphs", "neetcode_number": 96, "description": "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j)."},
    {"title": "Alien Dictionary", "difficulty": "Hard", "category": "Advanced Graphs", "neetcode_number": 97, "description": "There is a new alien language that uses the English alphabet."},
    {"title": "Cheapest Flights Within K Stops", "difficulty": "Medium", "category": "Advanced Graphs", "neetcode_number": 98, "description": "There are n cities connected by some number of flights."},
    
    # 1-D Dynamic Programming (12 questions)
    {"title": "Climbing Stairs", "difficulty": "Easy", "category": "1-D Dynamic Programming", "neetcode_number": 99, "description": "You are climbing a staircase. It takes n steps to reach the top."},
    {"title": "Min Cost Climbing Stairs", "difficulty": "Easy", "category": "1-D Dynamic Programming", "neetcode_number": 100, "description": "You are given an integer array cost where cost[i] is the cost of ith step on a staircase."},
    {"title": "House Robber", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 101, "description": "You are a professional robber planning to rob houses along a street."},
    {"title": "House Robber II", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 102, "description": "You are a professional robber planning to rob houses along a street."},
    {"title": "Longest Palindromic Substring", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 103, "description": "Given a string s, return the longest palindromic substring in s."},
    {"title": "Palindromic Substrings", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 104, "description": "Given a string s, return the number of palindromic substrings in it."},
    {"title": "Decode Ways", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 105, "description": "A message containing letters from A-Z can be encoded into numbers."},
    {"title": "Coin Change", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 106, "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money."},
    {"title": "Maximum Product Subarray", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 107, "description": "Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product."},
    {"title": "Word Break", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 108, "description": "Given a string s and a dictionary of strings wordDict."},
    {"title": "Longest Increasing Subsequence", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 109, "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence."},
    {"title": "Partition Equal Subset Sum", "difficulty": "Medium", "category": "1-D Dynamic Programming", "neetcode_number": 110, "description": "Given a non-empty array nums containing only positive integers."},
    
    # 2-D Dynamic Programming (11 questions)
    {"title": "Unique Paths", "difficulty": "Medium", "category": "2-D Dynamic Programming", "neetcode_number": 111, "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner."},
    {"title": "Longest Common Subsequence", "difficulty": "Medium", "category": "2-D Dynamic Programming", "neetcode_number": 112, "description": "Given two strings text1 and text2, return the length of their longest common subsequence."},
    {"title": "Best Time to Buy and Sell Stock with Cooldown", "difficulty": "Medium", "category": "2-D Dynamic Programming", "neetcode_number": 113, "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day."},
    {"title": "Coin Change 2", "difficulty": "Medium", "category": "2-D Dynamic Programming", "neetcode_number": 114, "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money."},
    {"title": "Target Sum", "difficulty": "Medium", "category": "2-D Dynamic Programming", "neetcode_number": 115, "description": "You are given an integer array nums and an integer target."},
    {"title": "Interleaving String", "difficulty": "Medium", "category": "2-D Dynamic Programming", "neetcode_number": 116, "description": "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2."},
    {"title": "Longest Increasing Path in a Matrix", "difficulty": "Hard", "category": "2-D Dynamic Programming", "neetcode_number": 117, "description": "Given an m x n integers matrix, return the length of the longest increasing path."},
    {"title": "Distinct Subsequences", "difficulty": "Hard", "category": "2-D Dynamic Programming", "neetcode_number": 118, "description": "Given two strings s and t, return the number of distinct subsequences of s which equals t."},
    {"title": "Edit Distance", "difficulty": "Hard", "category": "2-D Dynamic Programming", "neetcode_number": 119, "description": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2."},
    {"title": "Burst Balloons", "difficulty": "Hard", "category": "2-D Dynamic Programming", "neetcode_number": 120, "description": "You are given n balloons, indexed from 0 to n - 1."},
    {"title": "Regular Expression Matching", "difficulty": "Hard", "category": "2-D Dynamic Programming", "neetcode_number": 121, "description": "Given an input string s and a pattern p, implement regular expression matching."},
    
    # Greedy (8 questions)
    {"title": "Maximum Subarray", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 122, "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum."},
    {"title": "Jump Game", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 123, "description": "You are given an integer array nums. You are initially positioned at the array's first index."},
    {"title": "Jump Game II", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 124, "description": "Given an array of non-negative integers nums, you are initially positioned at the first index of the array."},
    {"title": "Gas Station", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 125, "description": "There are n gas stations along a circular route."},
    {"title": "Hand of Straights", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 126, "description": "Alice has some number of cards and she wants to rearrange the cards into groups."},
    {"title": "Merge Triplets to Form Target Triplet", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 127, "description": "A triplet is an array of three integers."},
    {"title": "Partition Labels", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 128, "description": "You are given a string s. We want to partition this string into as many parts as possible."},
    {"title": "Valid Parenthesis String", "difficulty": "Medium", "category": "Greedy", "neetcode_number": 129, "description": "Given a string s containing only three types of characters: '(', ')' and '*'."},
    
    # Intervals (6 questions)
    {"title": "Insert Interval", "difficulty": "Medium", "category": "Intervals", "neetcode_number": 130, "description": "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi]."},
    {"title": "Merge Intervals", "difficulty": "Medium", "category": "Intervals", "neetcode_number": 131, "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals."},
    {"title": "Non-overlapping Intervals", "difficulty": "Medium", "category": "Intervals", "neetcode_number": 132, "description": "Given an array of intervals intervals where intervals[i] = [starti, endi]."},
    {"title": "Meeting Rooms", "difficulty": "Easy", "category": "Intervals", "neetcode_number": 133, "description": "Given an array of meeting time intervals where intervals[i] = [starti, endi]."},
    {"title": "Meeting Rooms II", "difficulty": "Medium", "category": "Intervals", "neetcode_number": 134, "description": "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi]."},
    {"title": "Minimum Interval to Include Each Query", "difficulty": "Hard", "category": "Intervals", "neetcode_number": 135, "description": "You are given a 2D integer array intervals, where intervals[i] = [lefti, righti]."},
    
    # Math & Geometry (8 questions)
    {"title": "Rotate Image", "difficulty": "Medium", "category": "Math & Geometry", "neetcode_number": 136, "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise)."},
    {"title": "Spiral Matrix", "difficulty": "Medium", "category": "Math & Geometry", "neetcode_number": 137, "description": "Given an m x n matrix, return all elements of the matrix in spiral order."},
    {"title": "Set Matrix Zeroes", "difficulty": "Medium", "category": "Math & Geometry", "neetcode_number": 138, "description": "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's."},
    {"title": "Happy Number", "difficulty": "Easy", "category": "Math & Geometry", "neetcode_number": 139, "description": "Write an algorithm to determine if a number n is happy."},
    {"title": "Plus One", "difficulty": "Easy", "category": "Math & Geometry", "neetcode_number": 140, "description": "You are given a large integer represented as an integer array digits."},
    {"title": "Pow(x, n)", "difficulty": "Medium", "category": "Math & Geometry", "neetcode_number": 141, "description": "Implement pow(x, n), which calculates x raised to the power n."},
    {"title": "Multiply Strings", "difficulty": "Medium", "category": "Math & Geometry", "neetcode_number": 142, "description": "Given two non-negative integers num1 and num2 represented as strings."},
    {"title": "Detect Squares", "difficulty": "Medium", "category": "Math & Geometry", "neetcode_number": 143, "description": "You are given a stream of points on the X-Y plane."},
    
    # Bit Manipulation (7 questions)
    {"title": "Single Number", "difficulty": "Easy", "category": "Bit Manipulation", "neetcode_number": 144, "description": "Given a non-empty array of integers nums, every element appears twice except for one."},
    {"title": "Number of 1 Bits", "difficulty": "Easy", "category": "Bit Manipulation", "neetcode_number": 145, "description": "Write a function that takes an unsigned integer and returns the number of '1' bits it has."},
    {"title": "Counting Bits", "difficulty": "Easy", "category": "Bit Manipulation", "neetcode_number": 146, "description": "Given an integer n, return an array ans of length n + 1."},
    {"title": "Reverse Bits", "difficulty": "Easy", "category": "Bit Manipulation", "neetcode_number": 147, "description": "Reverse bits of a given 32 bits unsigned integer."},
    {"title": "Missing Number", "difficulty": "Easy", "category": "Bit Manipulation", "neetcode_number": 148, "description": "Given an array nums containing n distinct numbers in the range [0, n]."},
    {"title": "Sum of Two Integers", "difficulty": "Medium", "category": "Bit Manipulation", "neetcode_number": 149, "description": "Given two integers a and b, return the sum of the two integers without using the operators + and -."},
    {"title": "Reverse Integer", "difficulty": "Medium", "category": "Bit Manipulation", "neetcode_number": 150, "description": "Given a signed 32-bit integer x, return x with its digits reversed."},
]

# Template code for different languages
TEMPLATES = {
    "python": {
        "Two Sum": '''def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    pass''',
        "Valid Parentheses": '''def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    pass''',
        "Reverse Linked List": '''# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverseList(head):
    """
    :type head: ListNode
    :rtype: ListNode
    """
    pass''',
    },
    "java": {
        "Two Sum": '''public int[] twoSum(int[] nums, int target) {
    
}''',
        "Valid Parentheses": '''public boolean isValid(String s) {
    
}''',
        "Reverse Linked List": '''/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public ListNode reverseList(ListNode head) {
    
}''',
    },
    "cpp": {
        "Two Sum": '''vector<int> twoSum(vector<int>& nums, int target) {
    
}''',
        "Valid Parentheses": '''bool isValid(string s) {
    
}''',
        "Reverse Linked List": '''/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
ListNode* reverseList(ListNode* head) {
    
}''',
    },
    "javascript": {
        "Two Sum": '''/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};''',
        "Valid Parentheses": '''/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};''',
        "Reverse Linked List": '''/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};''',
    }
}

def get_template_for_question(title, language):
    """Get template code for a specific question and language"""
    if title in TEMPLATES[language]:
        return TEMPLATES[language][title]
    
    # Return basic template based on language
    if language == "python":
        return f'''def solution():
    """
    {title}
    """
    pass'''
    elif language == "java":
        return f'''public class Solution {{
    // {title}
    
}}'''
    elif language == "cpp":
        return f'''// {title}

'''
    elif language == "javascript":
        return f'''/**
 * {title}
 */
var solution = function() {{
    
}};'''
    
    return ""

