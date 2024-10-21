import shutil
import psutil
import random
import json
import os
import urllib.request
import ssl
import difflib
from datetime import datetime, date, timedelta
import re
from collections import Counter
from code_transfer import load_and_expand_code


print("Script is starting")

WISDOM_FILE = "jewish_wisdom.json"

def check_disk_space(drive_path=".", min_space_gb=1):
    """Check if there's enough free disk space on the specified drive"""
    try:
        total, used, free = shutil.disk_usage(drive_path)
        free_gb = free // (2**30)  # Convert bytes to gigabytes
        if free_gb < min_space_gb:
            print(f"Warning: Low disk space on {drive_path}. Only {free_gb}GB available.")
            return False
        print(f"Disk space check on {drive_path}: {free_gb}GB free out of {total // (2**30)}GB total.")
        return True
    except Exception as e:
        print(f"Error checking disk space on {drive_path}: {e}")
        return False

def cleanup_wisdom(max_entries_per_topic=50):
    """Limit the number of entries per topic to conserve space"""
    try:  # Added error handling for cleanup_wisdom
        for topic in TOPICS:
            if len(TOPICS[topic]) > max_entries_per_topic:
                TOPICS[topic] = TOPICS[topic][-max_entries_per_topic:]
        save_topics()
        print("Wisdom database cleaned up.")
    except Exception as e:
        print(f"Error during wisdom cleanup: {e}")

def save_topics():
    try:  # Added error handling for save_topics
        with open(WISDOM_FILE, 'w') as f:
            json.dump(TOPICS, f, indent=4)
        print("Wisdom saved successfully!")
    except IOError as e:
        print(f"Error saving wisdom to file: {e}")
    except Exception as e:
        print(f"Unexpected error while saving wisdom: {e}")

def load_topics():
    global TOPICS
    try:  # Added error handling for load_topics
        if os.path.exists(WISDOM_FILE):
            with open(WISDOM_FILE, 'r') as f:
                TOPICS = json.load(f)
            print("Existing wisdom loaded successfully!")
        else:
            TOPICS = {
                "Torah study": [
                    "The Talmud emphasizes the importance of daily Torah study.",
                    "Rabbi Akiva started learning at 40, showing it's never too late.",
                    "The Mishnah states that Torah study is equal to all other commandments combined."
                ],
                "Prayer": [
                    "The Amidah is considered the central prayer in Jewish liturgy.",
                    "Maimonides outlined specific laws for prayer in his Mishneh Torah.",
                    "The Baal Shem Tov taught that prayer is a form of cleaving to God."
                ],
                "Mitzvot": [
                    "There are 613 mitzvot in total, as counted by Maimonides.",
                    "The concept of 'hiddur mitzvah' encourages beautifying the commandments.",
                    "Some mitzvot are time-bound, while others apply at all times."
                ]
            }
            save_topics()
            print("Default wisdom created and saved!")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from wisdom file: {e}")
        TOPICS = {}  # Initialize with empty dictionary if JSON is invalid
    except Exception as e:
        print(f"Unexpected error while loading topics: {e}")
        TOPICS = {}  # Initialize with empty dictionary on any other error

def generate_prompt():
    try:  # Added error handling for generate_prompt
        question = random.choice([
            "What's the significance of",
            "What are the challenges in",
            "How does Hashem view",
            "How can one improve in",
            "How does one apply"
        ])
        topic = random.choice(list(TOPICS.keys()))
        return f"{question} {topic}?"
    except IndexError:
        return "No topics available for generating prompts."
    except Exception as e:
        print(f"Error generating prompt: {e}")
        return "Unable to generate prompt at this time."

def generate_response(prompt):
    try:  # Added error handling for generate_response
        for topic in TOPICS:
            if topic in prompt:
                return random.choice(TOPICS[topic])
        return "I'm sorry, I don't have information about that topic at the moment."
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Unable to generate a response at this time."

def get_random_wisdom():
    try:  # Added error handling for get_random_wisdom
        topic = random.choice(list(TOPICS.keys()))
        wisdom = random.choice(TOPICS[topic])
        return f"Topic: {topic}\nWisdom: {wisdom}"
    except IndexError:
        return "No wisdom available at the moment."
    except Exception as e:
        print(f"Error getting random wisdom: {e}")
        return "Unable to retrieve wisdom at this time."

def get_wisdom_of_the_day():
    try:  # Added error handling for get_wisdom_of_the_day
        today = date.today().toordinal()
        random.seed(today)
        topic = random.choice(list(TOPICS.keys()))
        wisdom = random.choice(TOPICS[topic])
        random.seed()  # Reset the seed
        return f"Wisdom of the Day:\nTopic: {topic}\n{wisdom}"
    except IndexError:
        return "No wisdom available for today."
    except Exception as e:
        print(f"Error getting wisdom of the day: {e}")
        return "Unable to retrieve wisdom of the day."

def fetch_online_wisdom():
    """Fetch a piece of wisdom from an online API"""
    context = ssl._create_unverified_context()
    url = "https://api.quotable.io/random"  # This is a free API for quotes
    try:
        with urllib.request.urlopen(url, context=context) as response:
            data = json.loads(response.read())
            return data['content']
    except urllib.error.URLError as e:  # Added specific error handling for network issues
        print(f"Network error while fetching online wisdom: {e}")
    except json.JSONDecodeError as e:  # Added error handling for JSON decoding
        print(f"Error decoding JSON from online wisdom: {e}")
    except Exception as e:
        print(f"Unexpected error fetching online wisdom: {e}")
    return None


def generate_quiz_question():
    """Generate a quiz question from the wisdom database"""
    try:
        topic = random.choice(list(TOPICS.keys()))
        wisdom = random.choice(TOPICS[topic])
        # Create a fill-in-the-blank question by removing a random word
        words = wisdom.split()
        blank_index = random.randint(0, len(words) - 1)
        answer = words[blank_index]
        words[blank_index] = "________"
        question = " ".join(words)
        return topic, question, answer
    except IndexError:
        return None, "No wisdom available for quiz.", None
    except Exception as e:
        print(f"Error generating quiz question: {e}")
        return None, "Unable to generate quiz question at this time.", None

def run_quiz(num_questions=5):
    """Run a quiz with a specified number of questions"""
    score = 0
    for i in range(num_questions):
        topic, question, answer = generate_quiz_question()
        if topic is None:
            print(question)
            return

        print(f"\nQuestion {i+1} (Topic: {topic}):")
        print(question)
        user_answer = input("Your answer: ")

        if user_answer.lower() == answer.lower():
            print("Correct!")
            score += 1
        else:
            print(f"Sorry, the correct answer was: {answer}")

    print(f"\nQuiz complete! Your score: {score}/{num_questions}")

# reflection and analysis
def generate_reflection_questions(wisdom):
    """Generate reflection questions based on the given wisdom"""
    questions = [
        f"How does the wisdom '{wisdom}' apply to your life?",
        f"What challenges might you face in implementing this wisdom?",
        f"Can you think of a personal experience that relates to this wisdom?",
        f"How might this wisdom be interpreted differently in various contexts?",
        f"What other Jewish teachings does this wisdom remind you of?"
    ]
    return random.choice(questions)

def save_reflection(wisdom, reflection):
    """Save user's reflection on a piece of wisdom"""
    reflections_file = "reflections.json"
    try:
        if os.path.exists(reflections_file):
            with open(reflections_file, 'r') as f:
                reflections = json.load(f)
        else:
            reflections = {}
        
        if wisdom not in reflections:
            reflections[wisdom] = []
        reflections[wisdom].append({
            "date": datetime.now().isoformat(),
            "reflection": reflection
        })
        
        with open(reflections_file, 'w') as f:
            json.dump(reflections, f, indent=4)
        print("Reflection saved successfully!")
    except Exception as e:
        print(f"Error saving reflection: {e}")

def review_reflections():
    """Review past reflections"""
    reflections_file = "reflections.json"
    try:
        if os.path.exists(reflections_file):
            with open(reflections_file, 'r') as f:
                reflections = json.load(f)
            
            if not reflections:
                print("No reflections found.")
                return
            
            for wisdom, reflection_list in reflections.items():
                print(f"\nWisdom: {wisdom}")
                for reflection in reflection_list:
                    print(f"Date: {reflection['date']}")
                    print(f"Reflection: {reflection['reflection']}")
                    print()
        else:
            print("No reflections found.")
    except Exception as e:
        print(f"Error reviewing reflections: {e}")

def analyze_reflections():
    """Analyze common themes in reflections"""
    reflections_file = "reflections.json"
    try:
        if os.path.exists(reflections_file):
            with open(reflections_file, 'r') as f:
                reflections = json.load(f)
            
            all_words = []
            for wisdom, reflection_list in reflections.items():
                for reflection in reflection_list:
                    words = re.findall(r'\w+', reflection['reflection'].lower())
                    all_words.extend(words)
            
            word_counts = Counter(all_words)
            common_words = word_counts.most_common(10)
            
            print("\nCommon themes in your reflections:")
            for word, count in common_words:
                if len(word) > 3:  # Ignore short words
                    print(f"{word}: {count} occurrences")
        else:
            print("No reflections found for analysis.")
    except Exception as e:
        print(f"Error analyzing reflections: {e}")

# Wisdom Chain 
def compare_wisdom(wisdom1, wisdom2):
    """Compare two pieces of wisdom and find similarities"""
    words1 = set(wisdom1.lower().split())
    words2 = set(wisdom2.lower().split())
    common_words = words1.intersection(words2)
    similarity = difflib.SequenceMatcher(None, wisdom1, wisdom2).ratio()
    
    print(f"\nComparing two pieces of wisdom:")
    print(f"1. {wisdom1}")
    print(f"2. {wisdom2}")
    print(f"\nSimilarity: {similarity:.2f}")
    print(f"Common words: {', '.join(common_words)}")
    
    if similarity > 0.3:
        print("These pieces of wisdom seem to be related!")
    else:
        print("These pieces of wisdom appear to be quite different.")

def generate_wisdom_chain(length=3):
    """Generate a chain of related wisdom"""
    chain = []
    topics = list(TOPICS.keys())
    current_topic = random.choice(topics)
    
    for _ in range(length):
        wisdom = random.choice(TOPICS[current_topic])
        chain.append((current_topic, wisdom))
        
        # Find the most similar topic for the next link in the chain
        max_similarity = 0
        next_topic = current_topic
        for topic in topics:
            if topic != current_topic:
                similarity = difflib.SequenceMatcher(None, wisdom, ' '.join(TOPICS[topic])).ratio()
                if similarity > max_similarity:
                    max_similarity = similarity
                    next_topic = topic
        
        current_topic = next_topic
    
    print("\nWisdom Chain:")
    for i, (topic, wisdom) in enumerate(chain, 1):
        print(f"{i}. [{topic}] {wisdom}")
    print("\nCan you see how these pieces of wisdom are connected?")

def wisdom_connection_challenge():
    """Challenge the user to find connections between random pieces of wisdom"""
    topics = list(TOPICS.keys())
    topic1, topic2 = random.sample(topics, 2)
    wisdom1 = random.choice(TOPICS[topic1])
    wisdom2 = random.choice(TOPICS[topic2])
    
    print("\nWisdom Connection Challenge!")
    print(f"1. [{topic1}] {wisdom1}")
    print(f"2. [{topic2}] {wisdom2}")
    print("\nCan you find a connection between these two pieces of wisdom?")
    connection = input("Your explanation of the connection: ")
    print("\nGreat effort! Here's an analysis of the connection you found:")
    compare_wisdom(wisdom1, wisdom2)
    print(f"\nYour explanation: {connection}")
    print("Reflecting on these connections can deepen our understanding of Jewish wisdom.")


def main():
    code = load_and_expand_code("latest_wisdom_generator.txt")
    print("Expanded code:")
    print(code)
    print("Executing code:")
    exec(code)
    print("Welcome to the Jewish Wisdom Generator!")
    check_disk_space()  # Check the current drive
    load_topics()  # Load existing topics or create default ones
    
    try:
        print(get_wisdom_of_the_day())
    except Exception as e:
        print(f"Error displaying wisdom of the day: {e}")
    
    while True:
        try:
            print("\nWhat would you like to do?")
            print("1. Generate random wisdom with a question")
            print("2. Get random wisdom")
            print("3. Add a new topic")
            print("4. Add wisdom to an existing topic")
            print("5. Fetch and add new online wisdom")
            print("6. Monitor system resources")
            print("7. Check all drive spaces")
            print("8. Take a wisdom quiz")  # New option
            print("9. Reflect on wisdom")
            print("10. Review past reflections")
            print("11. Analyze reflection themes")
            print("12. Exit")
            print("13. Compare two pieces of wisdom")
            print("14. Generate a wisdom chain")
            print("15. Take the wisdom connection challenge")
            print("16. Exit")
            choice = input("Enter your choice (1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16): ")
            if choice == '1':
                prompt = generate_prompt()
                response = generate_response(prompt)
                print(f"\nQ: {prompt}")
                print(f"A: {response}")
            elif choice == '2':
                wisdom = get_random_wisdom()
                print(f"\n{wisdom}")
            elif choice == '3':
                add_new_topic()
            elif choice == '4':
                add_wisdom_to_topic()
            elif choice == '5':
                add_fetched_wisdom()
            elif choice == '6':
                monitor_resources()
            elif choice == '7':
                check_all_drives()
            elif choice == '8':
                run_quiz()  # New quiz function
            elif choice == '9':
                wisdom = get_random_wisdom()
                print(f"\n{wisdom}")
                question = generate_reflection_questions(wisdom)
                print(f"\nReflection question: {question}")
                reflection = input("Your reflection: ")
                save_reflection(wisdom, reflection)
            elif choice == '10':
                review_reflections()
            elif choice == '11':
                analyze_reflections()
            elif choice == '12':
                print("Thank you for using the Jewish Wisdom Generator. Shalom!")
                break
            elif choice == '13':
                wisdom1 = get_random_wisdom()
                wisdom2 = get_random_wisdom()
                compare_wisdom(wisdom1, wisdom2)
            elif choice == '14':
                generate_wisdom_chain()
            elif choice == '15':
                wisdom_connection_challenge()
            elif choice == '16':
                print("Thank you for using the Jewish Wisdom Generator. Shalom!")
                break
            else:
                print("Invalid choice. Please enter a number between 1 and 16.")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            print("Please try again.")

if __name__ == "__main__":
    main()

print("Script is ending")

#========= New Code ===========
