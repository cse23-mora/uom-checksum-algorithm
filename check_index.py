def calculate_check_letter(index_str):
    index_str = str(index_str).strip().upper()
    
    # Basic format validation
    if len(index_str) < 6:
        return None, "Too short (must be at least 6 digits)"
    
    digits_part = index_str[:6]
    actual_letter = index_str[6:].strip() if len(index_str) > 6 else ""
    
    if not digits_part.isdigit():
        return None, "The first 6 characters must be digits."
    
    # Extract batch year (first 2 digits)
    batch_year = int(digits_part[:2])
    
    # Weights (same for all batches)
    weights = [8, 7, 6, 5, 4, 3]
    
    # New mapping (Batch 20+)
    new_mapping = [
        'H','J','K','L','M','N','P','R','T',
        'U','V','X','A','B','C','D','E','F','G'
    ]
    
    # Legacy mapping (Batch 10-19)
    legacy_mapping = [
        'P','R','T','U','V','X','A','B','C',
        'D','E','F','G','H','J','K','L','M','N'
    ]

    # Original mapping (Batch 09 and below)
    original_mapping = [
        'A','B','C','D','E','F','G','H','J',
        'K','L','M','N','P','R','T','U','V','X'
    ]
    
    # Choose correct mapping
    if batch_year >= 20:
        mapping = new_mapping
    elif batch_year >= 10:
        mapping = legacy_mapping
    else:
        mapping = original_mapping
    
    # Calculate weighted sum
    total_sum = sum(int(digits_part[i]) * weights[i] for i in range(6))
    
    # Modulo 19
    remainder = total_sum % 19
    
    # Get expected letter
    expected_letter = mapping[remainder]
    
    return expected_letter, actual_letter, digits_part


def main():
    print("🎓 University of Moratuwa - Index Number Checker")
    print("Supports original (<=09), legacy (10-19), and new (20+) batches")
    print("Type 'exit' or press Ctrl+C to quit.\n")
    
    while True:
        try:
            user_input = input("Enter Index Number (e.g., 230317J): ").strip()
            
            if user_input.lower() in ['exit', 'quit', 'e']:
                break
                
            if not user_input:
                continue
                
            result = calculate_check_letter(user_input)
            
            if result[0] is None:
                print(f"❌ Error: {result[1]}")
                print("-" * 40)
                continue
            
            expected, actual, digits = result
            full_correct_index = f"{digits}{expected}"
            
            if not actual:
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