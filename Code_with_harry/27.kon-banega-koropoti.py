# list of questions and answers=>Bangladesh
questions=[
    "What is the capital of Bangladesh?",
    "What is the currency of Bangladesh?",
    "What is the national flower of Bangladesh?",
    "What is the national animal of Bangladesh?",
    "What is the national bird of Bangladesh?",
    "What is the national fruit of Bangladesh?",
    "What is the national tree of Bangladesh?",
    "What is the national fish of Bangladesh?",
    "What is the national game of Bangladesh?",
    "What is the national dress of Bangladesh?",
    "What is the national language of Bangladesh?",
    "What is the national sport of Bangladesh?",
    "What is the national river of Bangladesh?",
    "What is the national mosque of Bangladesh?",
]
answers=[
    "Dhaka",
    "Taka",
    "Water lily",
    "Royal Bengal Tiger",
    "Oriental Magpie Robin",
    "Jackfruit",
    "Mango",
    "Hilsha",
    "Kabaddi",
    "Sari",
    "Bangla",
    "Kabaddi",
    "Jamuna",
    "Baitul Mukarram",
]
# list of incurrent and current multiple choice questions
choices=[
    ["Dhaka","Chittagong","Rajshahi","Khulna"],
    ["Taka","Rupee","Dollar","Euro"],
    ["Water lily","Rose","Lily","Sunflower"],
    ["Royal Bengal Tiger","Lion","Elephant","Deer"],
    ["Oriental Magpie Robin","Crow","Pigeon","Parrot"],
    ["Jackfruit","Mango","Banana","Apple"],
    ["Mango","Jackfruit","Banana","Apple"],
    ["Hilsha","Rui","Katla","Pangash"],
    ["Kabaddi","Cricket","Football","Hockey"],
    ["Sari","Salwar Kameez","Lehenga","Gown"],
    ["Bangla","English","Hindi","Urdu"],
    ["Kabaddi","Cricket","Football","Hockey"],
    ["Jamuna","Padma","Meghna","Surma"],
    ["Baitul Mukarram","Lalbagh Fort","Ahsan Manzil","Star Mosque"],
]

for question in questions:
    print(question)
    print("Options:")
    for option in choices[questions.index(question)]:
        print(option)
    answer=input("Enter your answer: ")
    if answer==answers[questions.index(question)]:
        print("--Correct Answer--")
    else:
        print("--Wrong Answer--")
    print("\n")