
***

# 🎓 Cracking the Code: The Secret Math Behind UOM Index Numbers

If you are a student at the **University of Moratuwa (UOM)**, you have written your index number hundreds of times. Whether it’s on a midterm paper, a lab report, or a university portal, you know your number by heart. 

But have you ever stopped to look at that final letter? `230317J`. `230025L`. 

That last letter isn't random. It isn't assigned sequentially. It is actually a **mathematical checksum**—a clever piece of hidden engineering designed to protect you from one of the most dangerous things in the world: human error.

Here is the secret logic behind how UOM index numbers actually work.

---

## 🛑 The Problem: The Chaos of Typos
Imagine it is the end of a grueling 3-hour final exam. You are exhausted, your hand is cramping, and you quickly scribble down your index number: **230025**. 

Except, in your exhaustion, you accidentally swap two numbers and write **320025**. Or maybe you write your '5' so sloppily that the grading lecturer reads it as a '6'. 

Without a safeguard, your exam paper now belongs to a phantom student. You get a zero, and fixing it requires a bureaucratic nightmare. 

To prevent this, system designers use **Checksums**. By running the digits through a specific mathematical formula, they generate a "check letter" at the end. If a clerk types your number into the system with a typo, the computer runs the math, sees that the final letter doesn't match the digits, and instantly flags it as an "Invalid Index Number."

---

## 🧠 The "Secret" UOM Algorithm
The UOM system doesn't just add the numbers together; it uses a specific algorithmic format called a **Weighted Modulo Checksum**. Here is exactly how it is calculated:

### Step 1: The Descending Weights
If the system just added your digits together ($2+3+0+0+2+5 = 12$), a typo that swapped two numbers ($3+2+0+0+2+5 = 12$) would still give the exact same total and the error would go unnoticed. 

To fix this, the position of the digit matters. The six digits of your index number are multiplied by descending weights: **8, 7, 6, 5, 4, and 3**. 

### Step 2: The Prime Number Division (Modulo 19)
Once all the weighted numbers are added together, the total is divided by **19**. 

Why 19? In computer science, dividing by a prime number is the gold standard for finding a remainder (called a Modulo operation). It mathematically guarantees that almost 100% of single-digit typos and swapped digits will produce a completely different remainder, catching the error instantly.

### Step 3: The Missing Letters
When you divide any number by 19, the remainder will always be between **0 and 18**. This gives us 19 possible outcomes, which map perfectly to the alphabet. 

But wait, the alphabet has 26 letters! The UOM designers intentionally **deleted 7 letters** from the system: `I, O, Q, S, W, Y, Z`. 

Why? Because handwriting is messy:
* **I** looks like a **1**
* **O** and **Q** look like a **0**
* **Z** looks like a **2**
* **S** looks like a **5**

By stripping out letters that cause visual confusion, the alphabet is trimmed down to exactly 19 foolproof letters.

---

## 🛠️ Putting It to the Test
Let's reverse-engineer a real index number to prove it works. Let's take **230025L**.

**1. Multiply each digit by the weights (8, 7, 6, 5, 4, 3):**
* 2 × 8 = 16
* 3 × 7 = 21
* 0 × 6 = 0
* 0 × 5 = 0
* 2 × 4 = 8
* 5 × 3 = 15

**2. Add them up:**
16 + 21 + 0 + 0 + 8 + 15 = **60**

**3. Find the remainder (Modulo 19):**
Divide 60 by 19. 
* 19 × 3 = 57. 
* 60 - 57 = **3**.
Our remainder is **3**. 

**4. Check the Lookup Table:**
Using the official UOM remainder mapping:

| Remainder | Letter | | Remainder | Letter | | Remainder | Letter |
| :---: | :---: |---| :---: | :---: |---| :---: | :---: |
| **0** | H | | **7** | R | | **14** | C |
| **1** | J | | **8** | T | | **15** | D |
| **2** | K | | **9** | U | | **16** | E |
| **3** | **L** | | **10** | V | | **17** | F |
| **4** | M | | **11** | X | | **18** | G |
| **5** | N | | **12** | A | | | |
| **6** | P | | **13** | B | | | |

A remainder of **3** maps exactly to **L**. The math checks out!

---



## 🛠️ Step-by-Step Example: `230317J`

**Step 1: Multiply each digit by its weight**
$$(2 \times 8) + (3 \times 7) + (0 \times 6) + (3 \times 5) + (1 \times 4) + (7 \times 3)$$
$$16 + 21 + 0 + 15 + 4 + 21 = 77$$

**Step 2: Divide by 19 to get the remainder**
$$77 \div 19 = 4 \text{ with a remainder of } 1$$

**Step 3: Find the letter**
A remainder of **1** maps exactly to **J**.
**Result:** `230317J` ✅

---

## 💡 The Takeaway
The next time you fill out an exam sheet and write down that final letter, take a moment to appreciate it. It isn't just an arbitrary character; it is a tiny, invisible shield of math, working behind the scenes to make sure your hard work is safely recorded under your name. 

It’s just one of the many hidden pieces of logic that keeps the university running smoothly!


## 🚀 How to Run the Checker

It’s just one of the many hidden pieces of logic that keeps the university running smoothly!


## 🚀 How to Run the Tool

### 1. Web-Based Checker (GitHub Pages Ready)
A modern, visual checker is available in the `web/` directory. It features real-time validation and a clean UI.
*   **Live Preview:** To use it, simply open `web/index.html` in your browser.
*   **Features:** Instant calculation as you type, clear success/error states, and mobile-friendly design.

### 2. CLI Python Tool
An interactive CLI tool is provided for terminal use.
*   **Run:** `python check_index.py` (after setting up the virtual environment as described below).
*   **Functionality:** Supports both full index verification and letter prediction from digits.

---

## 🛠️ Setup & Installation
*Created to explore the beauty of mathematical engineering in academic systems.*

## PS: Updated Logic (Latest)

The checker now uses batch-based mapping in both implementations:

1. Read the first 6 digits.
2. Compute weighted sum using 8, 7, 6, 5, 4, 3.
3. Compute remainder = sum % 19.
4. Select mapping by batch year (first 2 digits):
	- Batch year <= 19: use legacy mapping.
	- Batch year >= 20: use new mapping.

### New Mapping Table (Batch >= 20)

| Remainder | Letter | | Remainder | Letter | | Remainder | Letter |
| :---: | :---: |---| :---: | :---: |---| :---: | :---: |
| **0** | H | | **7** | R | | **14** | C |
| **1** | J | | **8** | T | | **15** | D |
| **2** | K | | **9** | U | | **16** | E |
| **3** | L | | **10** | V | | **17** | F |
| **4** | M | | **11** | X | | **18** | G |
| **5** | N | | **12** | A | | | |
| **6** | P | | **13** | B | | | |

### Legacy Mapping Table (Batch <= 19)

| Remainder | Letter | | Remainder | Letter | | Remainder | Letter |
| :---: | :---: |---| :---: | :---: |---| :---: | :---: |
| **0** | P | | **7** | B | | **14** | J |
| **1** | R | | **8** | C | | **15** | K |
| **2** | T | | **9** | D | | **16** | L |
| **3** | U | | **10** | E | | **17** | M |
| **4** | V | | **11** | F | | **18** | N |
| **5** | X | | **12** | G | | | |
| **6** | A | | **13** | H | | | |
