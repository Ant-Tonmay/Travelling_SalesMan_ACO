# Travelling Salesman Problem (TSP) Simulation Using Ant Colony Optimization (ACO)

## Problem Overview

The **Travelling Salesman Problem (TSP)** is a classic **NP-Hard** problem in combinatorial optimization. The objective is to find the shortest possible route that visits each city exactly once and returns to the starting city. This problem has practical applications in routing, logistics, and the design of circuits.

## Introduction to Ant Colony Optimization (ACO)

The **Ant Colony Optimization (ACO)** algorithm is inspired by the foraging behavior of ants. Ants are able to find the shortest path between their colony and a food source by laying down pheromones on the ground. Over time, shorter paths accumulate more pheromones, guiding other ants toward more efficient routes.

ACO is a heuristic approach that significantly reduces the time complexity of finding solutions to the TSP, especially for large-scale instances, though it does not always guarantee an optimal solution.

## ACO Algorithm

In ACO, artificial "ants" simulate the real-life behavior of ants. Each ant builds a path by probabilistically choosing the next city based on two factors:
- **Pheromone trails**: Indicating the desirability of certain paths based on previous iterations.
- **Heuristic information**: Based on the distance between cities (closer cities are more likely to be chosen).

### Probability of Next Move

### Probability of Next Move

The probability \( P_{ij}(t) \) that an ant moves from city \( i \) to city \( j \) at time \( t \) is determined by the following formula:

\[
P_{ij}(t) = \frac{{[\tau_{ij}(t)]^\alpha \cdot [\eta_{ij}]^\beta}}{{\sum_{k \in \text{{allowed}}} [\tau_{ik}(t)]^\alpha \cdot [\eta_{ik}]^\beta}}
\]

Where:
- \( \tau_{ij}(t) \) is the pheromone level between city \( i \) and city \( j \) at time \( t \).
- \( \eta_{ij} \) is the heuristic value (typically \( 1/d_{ij} \), where \( d_{ij} \) is the distance between city \( i \) and city \( j \)).
- \( \alpha \) controls the influence of the pheromone trail.
- \( \beta \) controls the influence of the heuristic value (distance).
- The denominator sums over all possible moves (cities not yet visited).


### Pheromone Update

After all ants have completed their tours, the pheromone levels are updated. The pheromones evaporate over time, and the paths taken by the best-performing ants receive additional pheromone reinforcement. This balance between exploration and exploitation allows the algorithm to converge on near-optimal solutions.

## How to Run the Simulation

1. **Define the City Coordinates**: The cities are represented by their \( x \) and \( y \) coordinates in a 2D plane.
2. **Calculate the Distance Matrix**: The distance between each pair of cities is calculated using Euclidean distance.
3. **Set ACO Parameters**:
   - Number of ants.
   - Number of iterations.
   - Pheromone decay rate.
   - Influence of pheromone (\( \alpha \)) and distance (\( \beta \)) on the probability of choosing the next city.
4. **Run the Simulation**: The ants explore various paths, and the best path is plotted on a graph, showing the cities and the shortest path discovered.

## Conclusion

This simulation demonstrates how ACO can be used to solve the Travelling Salesman Problem (TSP) by mimicking the natural behavior of ants. The ACO approach provides a time-efficient way to approximate the solution to an NP-Hard problem like TSP.
