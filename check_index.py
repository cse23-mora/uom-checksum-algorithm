import sys

def calculate_check_letter(index_str):
    index_str = str(index_str).strip().upper()
    
    # Basic format validation
    if len(index_str) < 6:
        return None, "Too short (must be at least 6 digits)"
    
    digits_part = index_str[:6]
    actual_letter = index_str[6:].strip() if len(index_str) > 6 else ""
    
    if not digits_part.isdigit():
        return None, "The first 6 characters must be digits."
    
    # Weights and Mapping as per the UOM algorithm
    weights = [8, 7, 6, 5, 4, 3]
    mapping = {
        0: 'H', 1: 'J', 2: 'K', 3: 'L', 4: 'M', 5: 'N', 6: 'P', 
        7: 'R', 8: 'T', 9: 'U', 10: 'V', 11: 'X', 12: 'A', 
        13: 'B', 14: 'C', 15: 'D', 16: 'E', 17: 'F', 18: 'G'
    }
    
    total_sum = 0
    for i in range(6):
        total_sum += int(digits_part[i]) * weights[i]
        
    remainder = total_sum % 19
    expected_letter = mapping[remainder]
    
    return expected_letter, actual_letter, digits_part

def main():
    print("🎓 University of Moratuwa - Index Number Checker")
    print("Type 'exit' or press Ctrl+C to quit.\n")
    
    while True:
        try:
            user_input = input("Enter Index Number (e.g., 230317J): ").strip()
            
            if user_input.lower() in ['exit', 'quit', 'e']:
                break
                
            if not user_input:
                continue
                
            expected, actual, digits = calculate_check_letter(user_input)
            
            if expected is None:
                print(f"❌ Error: {actual}")
                print("-" * 40)
                continue
            
            full_correct_index = f"{digits}{expected}"
            
            if not actual:
                # If user only entered digits, just show what the full index should be
                print(f"💡 The complete index number is: {full_correct_index}")
            elif actual == expected:
                print(f"✅ Correct! '{user_input}' is a valid index number.")
            else:
                print(f"❌ Incorrect. The letter '{actual}' is wrong.")
                print(f"✨ The correct index number should be: {full_correct_index}")
                
            print("-" * 40)
            
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
