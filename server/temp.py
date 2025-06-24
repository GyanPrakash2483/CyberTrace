import subprocess
import os

def getGhuntResults(email: str):
    # Run the ghunt command to output JSON to out.json
    out_file = 'out.json'
    try:
        subprocess.run([
            'ghunt', 'email', email, '--json', out_file
        ], check=True)
        with open(out_file, 'r', encoding='utf-8') as f:
            result = f.read()
        # Optionally, clean up the file
        os.remove(out_file)
        return result
    except Exception as e:
        return '{}'

print(getGhuntResults('gyanprakash2483@gmail.com'))