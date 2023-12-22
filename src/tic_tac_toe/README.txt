---------------------------
How Computer Plays the Game
Algorithm by Armaan Agrawal
---------------------------

Computer Plays even moves

Case 1: H plays Center Square
1. Center
2. Corner
3. If Diagonal Corner (Remaining cases C will win / draw)
4. Corner

Case 2: H plays Corner Square
1. Corner
2. Center
3. Special cases as below (Remaining cases C will win / draw)
    3.1 If Diagonal Corner to itself
    4.1 Non-Corner

    3.2 If Diagonally opposite Non-Corner
    4.2 Middle/Nearest Corner between the two opposite piece

Case 3. H plays Non-Corner Square
1. Non-Corner
2. Center