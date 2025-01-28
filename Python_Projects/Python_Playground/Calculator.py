Number1 = int(input("Please enter a number. "))
Operator = input("Please input an operator. ")
Number2 = int(input("Please inut another number. "))
Operator_Array = ["+", "-", "/", "*"]


def Calculate(firstNo, Operate, secondNo, Array):

    if Operate in Array:

        if Operate == "+":
            print(firstNo + secondNo)
        elif Operate == "-":
            print(firstNo - secondNo)
        elif Operate == "/":
            print(firstNo / secondNo)
        else:
            print(firstNo * secondNo)

    else:
        Operate = input("That operator is not defined. please enter +, -, * or /")
        Calculate(firstNo, Operate, secondNo, Array)
Calculate(Number1, Operator, Number2, Operator_Array)