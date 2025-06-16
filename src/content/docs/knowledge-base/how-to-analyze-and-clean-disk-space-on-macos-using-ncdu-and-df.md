---
title: How to Analyze and Clean Disk Space on macOS Using `ncdu` and `df`
description: Keeping your macOS system clean and your disk space under control
  is essential — especially when you're building large projects like Xcode apps
  or using environments like Node.js. In this post, you'll learn how to inspect,
  analyze, and free up space using `ncdu` and `df`.
date: 2025-06-16T09:45:00.000Z
authors:
  - lutfi
---

````markdown
# 🧹 How to Analyze and Clean Disk Space on macOS Using `ncdu` and `df`

Keeping your macOS system clean and your disk space under control is essential — especially when you're building large projects like Xcode apps or using environments like Node.js. In this post, you'll learn how to inspect, analyze, and free up space using `ncdu` and `df`.

## 📦 Step 1: Install `ncdu` (Disk Usage Analyzer)

`ncdu` (NCurses Disk Usage) is a fast, interactive command-line tool for analyzing disk usage. First, install it via Homebrew:

```bash
brew install ncdu
````

## 🔍 Step 2: Scan Your Home Directory

Use `ncdu` to recursively analyze your home directory:

```bash
ncdu ~
```

This will launch an interactive UI where you can:

* Browse hidden files and folders
* Sort by size
* Delete files interactively (press `d`)
* Navigate folders (`Enter`, `q` to quit)

## 💽 Step 3: Check Overall Disk Space with `df`

Use the built-in `df` command to check how much disk space is left:

```bash
df -h ~
```

**Sample Output:**

```
Filesystem      Size   Used  Avail Capacity  Mounted on
/dev/disk3s1s1  500G   390G   110G    78%    /
```

This tells you:

* Total size of your disk
* How much is used
* How much is available

## 🧹 Step 4: Clean Common Large Directories

### 1. `DerivedData` (Xcode)

Used for build cache — safe to delete:

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

### 2. `Archives` (Xcode)

Stores archived `.xcarchive` files. Delete only if you no longer need them for distribution or symbolication:

```bash
rm -rf ~/Library/Developer/Xcode/Archives/*
```

### 3. `Trash`

```bash
rm -rf ~/.Trash/*
```

### 4. `.npm`, `.cache`, etc.

```bash
rm -rf ~/.npm/*
rm -rf ~/.cache/*
```

### 5. Find and Remove All `node_modules`

If you have multiple JavaScript projects (e.g., under `hasdev/*`), you can remove all `node_modules` like this:

```bash
find hasdev -type d -name node_modules -exec rm -rf {} +
```

## 🧠 Pro Tip: Combined Overview

Want a quick view of both disk usage and available space?

```bash
df -h ~
ncdu ~
```

---

## ✅ Summary

| Tool   | Purpose                          | Usage Example               |
| ------ | -------------------------------- | --------------------------- |
| `ncdu` | Analyze disk usage interactively | `ncdu ~`                    |
| `df`   | View total and free disk space   | `df -h ~`                   |
| `find` | Search and clean large dirs      | `find . -name node_modules` |

Using `ncdu` + `df` gives you a powerful combo for managing disk usage without any bloated GUI tools. Clean regularly, and automate the tedious bits to keep your macOS development environment lean and fast.

---
