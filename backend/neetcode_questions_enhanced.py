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

Example 3:
Input: s = "listen", t = "silent"
Output: true

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

Example 3:
Input: nums = [4,1,-1,2,-1,2,3], k = 2
Output: [-1,2]

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

Example 3:
Input: nums = [2,3,4,5]
Output: [60,40,30,24]

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
    {
        "title": "Min Stack", 
        "difficulty": "Medium", 
        "category": "Stack", 
        "neetcode_number": 22, 
        "description": """Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
• MinStack() initializes the stack object.
• void push(int val) pushes the element val onto the stack.
• void pop() removes the element on the top of the stack.
• int top() gets the top element of the stack.
• int getMin() retrieves the minimum element in the stack.

Example 1:
Input: ["MinStack","push","push","push","getMin","pop","top","getMin"]
       [[],[-2],[0],[-3],[],[],[],[]]
Output: [null,null,null,null,-3,null,0,-2]

Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

Constraints:
• -2³¹ ≤ val ≤ 2³¹ - 1
• Methods pop, top and getMin operations will always be called on non-empty stacks.
• At most 3 × 10⁴ calls will be made to push, pop, top, and getMin."""
    },
    {
        "title": "Evaluate Reverse Polish Notation", 
        "difficulty": "Medium", 
        "category": "Stack", 
        "neetcode_number": 23, 
        "description": """Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

Example 1:
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9

Example 2:
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6

Example 3:
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22

Constraints:
• 1 ≤ tokens.length ≤ 10⁴
• tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200]."""
    },
    {
        "title": "Generate Parentheses", 
        "difficulty": "Medium", 
        "category": "Stack", 
        "neetcode_number": 24, 
        "description": """Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
Input: n = 1
Output: ["()"]

Example 3:
Input: n = 2
Output: ["(())","()()"]

Constraints:
• 1 ≤ n ≤ 8"""
    },
    {
        "title": "Daily Temperatures", 
        "difficulty": "Medium", 
        "category": "Stack", 
        "neetcode_number": 25, 
        "description": """Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Example 1:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Example 2:
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Example 3:
Input: temperatures = [30,60,90]
Output: [1,1,0]

Constraints:
• 1 ≤ temperatures.length ≤ 10⁵
• 30 ≤ temperatures[i] ≤ 100"""
    },
    {
        "title": "Car Fleet", 
        "difficulty": "Medium", 
        "category": "Stack", 
        "neetcode_number": 26, 
        "description": """There are n cars going to the same destination along a one-lane road. The destination is target miles away.

You are given two integer arrays position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the number of car fleets that will arrive at the destination.

Example 1:
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation: The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12.
The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

Example 2:
Input: target = 10, position = [3], speed = [3]
Output: 1

Example 3:
Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1

Constraints:
• n == position.length == speed.length
• 1 ≤ n ≤ 10⁵
• 0 < target ≤ 10⁶
• 0 ≤ position[i] < target
• All the values of position are unique.
• 0 < speed[i] ≤ 10⁶"""
    },
    {
        "title": "Largest Rectangle in Histogram", 
        "difficulty": "Hard", 
        "category": "Stack", 
        "neetcode_number": 27, 
        "description": """Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1. The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:
Input: heights = [2,4]
Output: 4

Example 3:
Input: heights = [1,1,1,1,1]
Output: 5

Constraints:
• 1 ≤ heights.length ≤ 10⁵
• 0 ≤ heights[i] ≤ 10⁴"""
    },
    
    # Binary Search (8 questions)
    {
        "title": "Binary Search", 
        "difficulty": "Easy", 
        "category": "Binary Search", 
        "neetcode_number": 28, 
        "description": """Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Example 3:
Input: nums = [5], target = 5
Output: 0

Constraints:
• 1 ≤ nums.length ≤ 10⁴
• -10⁴ ≤ nums[i], target ≤ 10⁴
• All the integers in nums are unique.
• nums is sorted in ascending order."""
    },
    {
        "title": "Search a 2D Matrix", 
        "difficulty": "Medium", 
        "category": "Binary Search", 
        "neetcode_number": 29, 
        "description": """Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

• Integers in each row are sorted from left to right.
• The first integer of each row is greater than the last integer of the previous row.

Example 1:
Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 5
Output: true

Example 2:
Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 13
Output: true

Example 3:
Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 20
Output: false

Constraints:
• m == matrix.length
• n == matrix[i].length
• 1 ≤ m, n ≤ 100
• -10⁴ ≤ matrix[i][j], target ≤ 10⁴"""
    },
    {
        "title": "Koko Eating Bananas", 
        "difficulty": "Medium", 
        "category": "Binary Search", 
        "neetcode_number": 30, 
        "description": """Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but wants to finish eating all the bananas before the guards come back.

Return the minimum integer k such that she can eat all the bananas within h hours.

Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:
Input: piles = [30,11,23,4,20], h = 6
Output: 23

Constraints:
• 1 ≤ piles.length ≤ 10⁴
• piles.length ≤ h ≤ 10⁹
• 1 ≤ piles[i] ≤ 10⁹"""
    },
    {
        "title": "Find Minimum in Rotated Sorted Array", 
        "difficulty": "Medium", 
        "category": "Binary Search", 
        "neetcode_number": 31, 
        "description": """Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

• [4,5,6,7,0,1,2] if it was rotated 4 times.
• [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example 1:
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.

Constraints:
• n == nums.length
• 1 ≤ n ≤ 5000
• -5000 ≤ nums[i] ≤ 5000
• All the integers of nums are unique.
• nums is sorted and rotated between 1 and n times."""
    },
    {
        "title": "Search in Rotated Sorted Array", 
        "difficulty": "Medium", 
        "category": "Binary Search", 
        "neetcode_number": 32, 
        "description": """There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:
Input: nums = [1], target = 0
Output: -1

Constraints:
• 1 ≤ nums.length ≤ 5000
• -10⁴ ≤ nums[i] ≤ 10⁴
• All values of nums are unique.
• nums is an ascending array that is possibly rotated.
• -10⁴ ≤ target ≤ 10⁴"""
    },
    {
        "title": "Time Based Key-Value Store", 
        "difficulty": "Medium", 
        "category": "Binary Search", 
        "neetcode_number": 33, 
        "description": """Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:

• TimeMap() Initializes the object of the data structure.
• void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
• String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".

Example 1:
Input: ["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output: [null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation: 
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"

Constraints:
• 1 ≤ key.length, value.length ≤ 100
• key and value consist of lowercase English letters and digits.
• 1 ≤ timestamp ≤ 10⁷
• All the timestamps timestamp of set are strictly increasing.
• At most 2 × 10⁵ calls will be made to set and get."""
    },
    {
        "title": "Median of Two Sorted Arrays", 
        "difficulty": "Hard", 
        "category": "Binary Search", 
        "neetcode_number": 34, 
        "description": """Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Example 3:
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000

Constraints:
• nums1.length == m
• nums2.length == n
• 0 ≤ m ≤ 1000
• 0 ≤ n ≤ 1000
• 1 ≤ m + n ≤ 2000
• -10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶"""
    },
    
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
    {
        "title": "Reorder List", 
        "difficulty": "Medium", 
        "category": "Linked List", 
        "neetcode_number": 37, 
        "description": """You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4]
Output: [1,4,2,3]

Example 2:
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

Example 3:
Input: head = [1,2]
Output: [1,2]

Constraints:
• The number of nodes in the list is in the range [1, 5 × 10⁴].
• 1 ≤ Node.val ≤ 1000"""
    },
    {
        "title": "Remove Nth Node From End of List", 
        "difficulty": "Medium", 
        "category": "Linked List", 
        "neetcode_number": 38, 
        "description": """Given the head of a linked list, remove the nth node from the end of the list and return its head.

Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:
Input: head = [1], n = 1
Output: []

Example 3:
Input: head = [1,2], n = 1
Output: [1]

Constraints:
• The number of nodes in the list is sz.
• 1 ≤ sz ≤ 30
• 0 ≤ Node.val ≤ 100
• 1 ≤ n ≤ sz

Follow up: Could you do this in one pass?"""
    },
    {
        "title": "Copy List with Random Pointer", 
        "difficulty": "Medium", 
        "category": "Linked List", 
        "neetcode_number": 39, 
        "description": """A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Example 3:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

Constraints:
• 0 ≤ n ≤ 1000
• -10⁴ ≤ Node.val ≤ 10⁴
• Node.random is null or is pointing to some node in the linked list."""
    },
    {
        "title": "Add Two Numbers", 
        "difficulty": "Medium", 
        "category": "Linked List", 
        "neetcode_number": 40, 
        "description": """You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
• The number of nodes in each linked list is in the range [1, 100].
• 0 ≤ Node.val ≤ 9
• It is guaranteed that the list represents a number that does not have leading zeros."""
    },
    {
        "title": "Linked List Cycle", 
        "difficulty": "Easy", 
        "category": "Linked List", 
        "neetcode_number": 41, 
        "description": """Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:
• The number of the nodes in the list is in the range [0, 10⁴].
• -10⁵ ≤ Node.val ≤ 10⁵
• pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory?"""
    },
    {
        "title": "Find the Duplicate Number", 
        "difficulty": "Medium", 
        "category": "Linked List", 
        "neetcode_number": 42, 
        "description": """Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

Example 1:
Input: nums = [1,3,4,2,2]
Output: 2

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

Example 3:
Input: nums = [1,1]
Output: 1

Constraints:
• 1 ≤ n ≤ 10⁵
• nums.length == n + 1
• 1 ≤ nums[i] ≤ n
• All the integers in nums appear only once except for precisely one integer which appears two or more times.

Follow up:
• How can we prove that at least one duplicate number must exist in nums?
• Can you solve the problem in linear runtime complexity?"""
    },
    {
        "title": "LRU Cache", 
        "difficulty": "Medium", 
        "category": "Linked List", 
        "neetcode_number": 43, 
        "description": """Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

• LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
• int get(int key) Return the value of the key if the key exists, otherwise return -1.
• void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Example 1:
Input: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output: [null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Constraints:
• 1 ≤ capacity ≤ 3000
• 0 ≤ key ≤ 10⁴
• 0 ≤ value ≤ 10⁵
• At most 2 × 10⁵ calls will be made to get and put."""
    },
    {
        "title": "Merge k Sorted Lists", 
        "difficulty": "Hard", 
        "category": "Linked List", 
        "neetcode_number": 44, 
        "description": """You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:
Input: lists = []
Output: []

Example 3:
Input: lists = [[]]
Output: []

Constraints:
• k == lists.length
• 0 ≤ k ≤ 10⁴
• 0 ≤ lists[i].length ≤ 500
• -10⁴ ≤ lists[i][j] ≤ 10⁴
• lists[i] is sorted in ascending order.
• The sum of lists[i].length will not exceed 10⁴."""
    },
    {
        "title": "Reverse Nodes in k-Group", 
        "difficulty": "Hard", 
        "category": "Linked List", 
        "neetcode_number": 45, 
        "description": """Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

Example 3:
Input: head = [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]

Constraints:
• The number of nodes in the list is n.
• 1 ≤ k ≤ n ≤ 5000
• 0 ≤ Node.val ≤ 1000

Follow-up: Can you solve the problem in O(1) extra memory space?"""
    },
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
        "Contains Duplicate": '''def containsDuplicate(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    pass''',
        "Valid Anagram": '''def isAnagram(s, t):
    """
    :type s: str
    :type t: str
    :rtype: bool
    """
    pass''',
        "Group Anagrams": '''def groupAnagrams(strs):
    """
    :type strs: List[str]
    :rtype: List[List[str]]
    """
    pass''',
        "Top K Frequent Elements": '''def topKFrequent(nums, k):
    """
    :type nums: List[int]
    :type k: int
    :rtype: List[int]
    """
    pass''',
        "Product of Array Except Self": '''def productExceptSelf(nums):
    """
    :type nums: List[int]
    :rtype: List[int]
    """
    pass''',
        "Valid Palindrome": '''def isPalindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    pass''',
        "Two Sum II": '''def twoSum(numbers, target):
    """
    :type numbers: List[int]
    :type target: int
    :rtype: List[int]
    """
    pass''',
        "Container With Most Water": '''def maxArea(height):
    """
    :type height: List[int]
    :rtype: int
    """
    pass''',
        "Trapping Rain Water": '''def trap(height):
    """
    :type height: List[int]
    :rtype: int
    """
    pass''',
        "Best Time to Buy and Sell Stock": '''def maxProfit(prices):
    """
    :type prices: List[int]
    :rtype: int
    """
    pass''',
        "Longest Substring Without Repeating Characters": '''def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    pass''',
        "Min Stack": '''class MinStack(object):

    def __init__(self):
        

    def push(self, val):
        """
        :type val: int
        :rtype: None
        """
        

    def pop(self):
        """
        :rtype: None
        """
        

    def top(self):
        """
        :rtype: int
        """
        

    def getMin(self):
        """
        :rtype: int
        """
        ''',
        "Binary Search": '''def search(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: int
    """
    pass''',
        "Merge Two Sorted Lists": '''# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def mergeTwoLists(list1, list2):
    """
    :type list1: Optional[ListNode]
    :type list2: Optional[ListNode]
    :rtype: Optional[ListNode]
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
        "Contains Duplicate": '''public boolean containsDuplicate(int[] nums) {
    
}''',
        "Valid Anagram": '''public boolean isAnagram(String s, String t) {
    
}''',
        "Group Anagrams": '''public List<List<String>> groupAnagrams(String[] strs) {
    
}''',
        "Top K Frequent Elements": '''public int[] topKFrequent(int[] nums, int k) {
    
}''',
        "Product of Array Except Self": '''public int[] productExceptSelf(int[] nums) {
    
}''',
        "Valid Palindrome": '''public boolean isPalindrome(String s) {
    
}''',
        "Two Sum II": '''public int[] twoSum(int[] numbers, int target) {
    
}''',
        "Container With Most Water": '''public int maxArea(int[] height) {
    
}''',
        "Trapping Rain Water": '''public int trap(int[] height) {
    
}''',
        "Best Time to Buy and Sell Stock": '''public int maxProfit(int[] prices) {
    
}''',
        "Longest Substring Without Repeating Characters": '''public int lengthOfLongestSubstring(String s) {
    
}''',
        "Min Stack": '''class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        
    }
    
    public int getMin() {
        
    }
}''',
        "Binary Search": '''public int search(int[] nums, int target) {
    
}''',
        "Merge Two Sorted Lists": '''/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    
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
        "Contains Duplicate": '''bool containsDuplicate(vector<int>& nums) {
    
}''',
        "Valid Anagram": '''bool isAnagram(string s, string t) {
    
}''',
        "Group Anagrams": '''vector<vector<string>> groupAnagrams(vector<string>& strs) {
    
}''',
        "Top K Frequent Elements": '''vector<int> topKFrequent(vector<int>& nums, int k) {
    
}''',
        "Product of Array Except Self": '''vector<int> productExceptSelf(vector<int>& nums) {
    
}''',
        "Valid Palindrome": '''bool isPalindrome(string s) {
    
}''',
        "Two Sum II": '''vector<int> twoSum(vector<int>& numbers, int target) {
    
}''',
        "Container With Most Water": '''int maxArea(vector<int>& height) {
    
}''',
        "Trapping Rain Water": '''int trap(vector<int>& height) {
    
}''',
        "Best Time to Buy and Sell Stock": '''int maxProfit(vector<int>& prices) {
    
}''',
        "Longest Substring Without Repeating Characters": '''int lengthOfLongestSubstring(string s) {
    
}''',
        "Min Stack": '''class MinStack {
public:
    MinStack() {
        
    }
    
    void push(int val) {
        
    }
    
    void pop() {
        
    }
    
    int top() {
        
    }
    
    int getMin() {
        
    }
};''',
        "Binary Search": '''int search(vector<int>& nums, int target) {
    
}''',
        "Merge Two Sorted Lists": '''/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    
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
        "Contains Duplicate": '''/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    
};''',
        "Valid Anagram": '''/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    
};''',
        "Group Anagrams": '''/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
};''',
        "Top K Frequent Elements": '''/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    
};''',
        "Product of Array Except Self": '''/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
};''',
        "Valid Palindrome": '''/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};''',
        "Two Sum II": '''/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    
};''',
        "Container With Most Water": '''/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    
};''',
        "Trapping Rain Water": '''/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
};''',
        "Best Time to Buy and Sell Stock": '''/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};''',
        "Longest Substring Without Repeating Characters": '''/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};''',
        "Min Stack": '''var MinStack = function() {
    
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    
};''',
        "Binary Search": '''/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    
};''',
        "Merge Two Sorted Lists": '''/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
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
