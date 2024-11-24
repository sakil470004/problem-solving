for i in range(7):
    print(i)
    # if we use break statement then the else block will not be executed
    if(i==4):
        break
else:
    # after the for loop is executed this else block will be executed
    print("This is inside else of for")


while i<10:
    print(i)
    i+=1
    # if(i==8):
    #     break
else:
    print("This is inside else of while")