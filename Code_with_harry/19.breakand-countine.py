for i in range(12):
    if(i==5):
        continue
    if(i==11):
        break
    print("5x",i,"=",5*i)

    # break out of loop
    # continue to next iteration. or out of current iteration.

    #  do while loop emulation
    i=0
    while True:
        print("Infinite loop",i)
        i=i+1
        if(i==5):
            break