import random
import string

def generate_fake_usernames(base_username):
    fake_usernames = set()
    
    suffixes = [
        '1', '01', '123', '321', '111', '000', 'real', 'official', 'x', 'xx', 'xxx',
        'the', 'not', 'fake', '0', '007', 'insta', 'ig', 'fan', 'admin',
        '2024', '2023', '2003'
    ]
    prefixes = [
        '', '_', 'the', 'real', 'official', 'fake', 'not', 'x', 'xx', 'xxx',
        '1', '2', '007', 'user', 'fan', 'admin', 'z', 'real_', 'only'
    ]
    patterns = [
        '{}{}', '{}{}', '{}.{}', '{}-{}', '{}{}', '_{}{}', '{}{}1',
        '{}{}x', '{}{}z', '{}{}official', '{}.real', '{}{}_', '{}.{}', '{}{}{}',
        '{}{}{}', '{}{}', '{}.{}.', '{}{}{}', '{}.{}{}', '{}{}', '{}{}123'
    ]

    while len(fake_usernames) < 150:
        prefix = random.choice(prefixes) if random.random() < 0.5 else ''
        suffix = random.choice(suffixes) if random.random() < 0.7 else ''
        mid = ''.join(random.choices(string.ascii_lowercase, k=random.randint(1, 2))) if random.random() < 0.3 else ''
        
        pattern = random.choice(patterns)
        
        try:
            count = pattern.count('{}')
            if count == 3:
                fake = pattern.format(prefix, base_username, suffix)
            elif count == 2:
                fake = pattern.format(prefix + base_username, mid + suffix)
            else:
                fake = pattern.format(prefix + base_username)
        except:
            continue

        fake = fake.replace(" ", "").lower()
        if fake != base_username.replace(" ", "").lower():
            fake_usernames.add(fake)

    return list(fake_usernames)

# Example usage
base = input("Enter the original username (e.g., xyz): ").strip()
fakes = generate_fake_usernames(base)

print(f"\nGenerated {len(fakes)} fake usernames:")
for f in fakes:
    print(f)