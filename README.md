Welcome to the game of BATTLESHIP!

This project was made to further develop my Javascript skills as I go through my web development journey, and attend school learning computer science!

This projects makes use of the MVC architecture pattern in order to split up the program into specific parts that accomplish their tasks, and ensuring easier navigation through the code base.

LEARNING EXPERIENCES:

- Handling the creation of random AI ships and placing them onto the grid while avoiding overlaps.
  - This was overcome with using the Map data structure built into Javascript to provid quick lookup of already placed ships in order to avoid having to loop through all indexes of the array which can result in poor performance.
- Handling the creation and placing of User ships on the board while also avoiding overlaps and providing visual queues indicating overlapping problems
  - This was done similarily to the AI ship placements, but with the added challenge of providing visual feedback to the user through the form of cell highlighting of the board for how many slots the ship will take up, whether it is overlapping, or whether it is overflowing from the board
  - By keeping track of the grid indexes of each DOM cell, I was able to highlight the appropriate cells, and change the cursor if it entered into an invalid location
- Dealing with attacking ships and checking whether they had been destroyed
  - This was accomplished by creating custom ship classes to store the relevant information, and then store each ship in a 2D grid which resembles the board. Each grid[x][y] slot was mapped to the corresponding DOM[x][y] cell in order to handle mouse input of firing the shots
- Creating a computer opponent that was able to fire shots with purpose, rather than randomly aiming at each empty slot
  - This was accomplished by using the Stack data structure to push the coordinates of future shots if the computer successfully hit a ship. This meant creating a finite state machine that had two states, random attack and targeted attack. The random attack is activated when the stack is empty meaning the bot has not hit a target or has no more suggested targets. The targetted attack state is activated when the bot hits a target and it begins to push targets onto the stack

THINGS I WOULD DO DIFFERENTLY:

- Since this project was worked on over the course of some time due to being in school, there were large gaps in time between working on it meaning I would forget some of the previous things I implemented. I would create more documentation in the future to avoid this
- On the random computer ship placements, my current algorithm for finding the slots is nondeterministic as it relies on a loop running until all ships have been placed. This doesn't pose a problem for this project as there are enough empty slots to ensure there is spacing for each ship, but if the grid were smaller or more ships were added, the randomess of choosing slots could pose a problem and may result in an infinite loop. I would address this by creating an algorithm that predetermines the possible grid locations, and then chooses at random from these positions to avoid having to use a while() loop.
