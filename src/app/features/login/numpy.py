import numpy as np

print("NumPy version:", np.__version__)

arr1 = np.arange(1, 11)
print("Array from 1 to 10:", arr1)

arr_true = np.full((3, 3), True, dtype=bool)
print("3x3 True array:\n", arr_true)

print("Even elements:", arr1[arr1 % 2 == 0])

arr1[1::2] = -1
print("Array with -1 in even positions:", arr1)

arr_reshaped = np.arange(100).reshape(50, 2)
print("Reshaped array (50, 2):\n", arr_reshaped)
