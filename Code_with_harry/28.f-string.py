# ---------------------- old method ----------------------
letter="My name is {} , I am a {} , I am {} years old"
name="Mynul"
profession="Student"
age=20
print(letter.format(name,profession,age))
# ---------------------- new method ----------------------
print(f"My name is {name} , I am a {profession} , I am {age} years old")