import bcrypt

# Test passwords
passwords = ['owner123', 'admin123', 'student123', 'password123', 'test123']
hashes = [
    '$2b$12$jqTvPl8OkBbQxKDIYzi9T.BuuiUzSkjdmIemI481tqcta1q3tfk7i',  # owner
    '$2b$12$W1lw1HiTdP7zJux1No4DlO3t6EHsJrZNwpnW3CoCLqbEl4cGk4Loy',  # admin
    '$2b$12$w.dn1U5DoBWi91oh30rEa.HOV/rC6H9uiD/Pc0cjY6mSKAYqQnSrC'   # student
]

for password in passwords:
    for i, hash_val in enumerate(hashes):
        if bcrypt.checkpw(password.encode('utf-8'), hash_val.encode('utf-8')):
            roles = ['owner', 'admin', 'student']
            print(f"✅ Found: {roles[i]}@hub.com password is '{password}'")
