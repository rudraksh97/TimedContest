# Neetcode 150 questions data
# This represents a subset of popular questions with balanced difficulty distribution
NEETCODE_QUESTIONS = [
    # Arrays & Hashing (20 questions)
    {"title": "Two Sum", "difficulty": "Easy", "category": "Arrays & Hashing", "neetcode_number": 1, "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."},
    {"title": "Contains Duplicate", "difficulty": "Easy", "category": "Arrays & Hashing", "neetcode_number": 2, "description": "Given an integer array nums, return true if any value appears at least twice in the array."},
    {"title": "Valid Anagram", "difficulty": "Easy", "category": "Arrays & Hashing", "neetcode_number": 3, "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise."},
    {"title": "Group Anagrams", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 4, "description": "Given an array of strings strs, group the anagrams together."},
    {"title": "Top K Frequent Elements", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 5, "description": "Given an integer array nums and an integer k, return the k most frequent elements."},
    {"title": "Product of Array Except Self", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 6, "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]."},
    {"title": "Valid Sudoku", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 7, "description": "Determine if a 9 x 9 Sudoku board is valid."},
    {"title": "Encode and Decode Strings", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 8, "description": "Design an algorithm to encode a list of strings to a string and decode it back."},
    {"title": "Longest Consecutive Sequence", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 9, "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence."},
    {"title": "3Sum", "difficulty": "Medium", "category": "Arrays & Hashing", "neetcode_number": 10, "description": "Given an integer array nums, return all the triplets such that nums[i] + nums[j] + nums[k] == 0."},
    
    # Two Pointers (15 questions)
    {"title": "Valid Palindrome", "difficulty": "Easy", "category": "Two Pointers", "neetcode_number": 11, "description": "A phrase is a palindrome if it reads the same forward and backward."},
    {"title": "Two Sum II", "difficulty": "Medium", "category": "Two Pointers", "neetcode_number": 12, "description": "Given a 1-indexed array that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number."},
    {"title": "Container With Most Water", "difficulty": "Medium", "category": "Two Pointers", "neetcode_number": 13, "description": "You are given an integer array height of length n. Find two lines that together with the x-axis form a container that contains the most water."},
    {"title": "Trapping Rain Water", "difficulty": "Hard", "category": "Two Pointers", "neetcode_number": 14, "description": "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining."},
    {"title": "3Sum Closest", "difficulty": "Medium", "category": "Two Pointers", "neetcode_number": 15, "description": "Given an integer array nums and an integer target, return the sum of the three integers that is closest to target."},
    
    # Sliding Window (12 questions)
    {"title": "Best Time to Buy and Sell Stock", "difficulty": "Easy", "category": "Sliding Window", "neetcode_number": 16, "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day."},
    {"title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "category": "Sliding Window", "neetcode_number": 17, "description": "Given a string s, find the length of the longest substring without repeating characters."},
    {"title": "Longest Repeating Character Replacement", "difficulty": "Medium", "category": "Sliding Window", "neetcode_number": 18, "description": "You are given a string s and an integer k. You can choose any character and change it to any other character."},
    {"title": "Permutation in String", "difficulty": "Medium", "category": "Sliding Window", "neetcode_number": 19, "description": "Given two strings s1 and s2, return true if s2 contains a permutation of s1."},
    {"title": "Minimum Window Substring", "difficulty": "Hard", "category": "Sliding Window", "neetcode_number": 20, "description": "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window."},
    
    # Stack (10 questions)
    {"title": "Valid Parentheses", "difficulty": "Easy", "category": "Stack", "neetcode_number": 21, "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."},
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
    {"title": "Reverse Linked List", "difficulty": "Easy", "category": "Linked List", "neetcode_number": 35, "description": "Given the head of a singly linked list, reverse the list, and return the reversed list."},
    {"title": "Merge Two Sorted Lists", "difficulty": "Easy", "category": "Linked List", "neetcode_number": 36, "description": "You are given the heads of two sorted linked lists list1 and list2."},
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

