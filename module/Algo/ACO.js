  // Helper function for probabilistic selection
  function np_choice(arr, size, p) {
	let sum = 0;
	const rand = Math.random();
	for (let i = 0; i < arr.length; i++) {
	  sum += p[i];
	  if (rand < sum) return [arr[i]];
	}
	return null;
  }

// Ant Colony Optimization (ACO) Implementation
export default class AntColony {
  constructor(
    distances,
    n_ants,
    n_best,
    n_iterations,
    decay,
    alpha = 1,
    beta = 2,
	appState
  ) {
    this.distances = distances;
    this.pheromone = Array(distances.length)
      .fill()
      .map(() => Array(distances.length).fill(1 / distances.length));
    this.all_inds = Array.from({ length: distances.length }, (_, i) => i);
    this.n_ants = n_ants;
    this.n_best = n_best;
    this.n_iterations = n_iterations;
    this.decay = decay;
    this.alpha = alpha;
    this.beta = beta;
    this.best_length = Infinity;
    this.best_path = null;
  }

  run() {
    const all_paths = [];
    for (let i = 0; i < this.n_iterations; i++) {
      const iteration_paths = this.gen_all_paths();
      this.spread_pheromone(iteration_paths, this.n_best);
      this.decay_pheromone();
      all_paths.push(...iteration_paths.map((p) => p.path));

      if (i % 10 === 0) {
        console.log(`Iteration ${i}: Best path length: ${this.best_length}`);
      }
    }

    return {
      best_path: this.best_path,
      best_length: this.best_length,
      all_paths,
    };
  }

  gen_path_dist(path) {
    let total_dist = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total_dist += this.distances[path[i]][path[i + 1]];
    }
    total_dist += this.distances[path[path.length - 1]][path[0]]; // Return to start city
    return total_dist;
  }

  gen_all_paths() {
    const all_paths = [];
    for (let i = 0; i < this.n_ants; i++) {
      const path = this.gen_path(0); // Start from city 0
      all_paths.push({ path, dist: this.gen_path_dist(path) });
    }
    return all_paths;
  }

  gen_path(start) {
    const path = [start];
    const visited = new Set([start]);
    let prev = start;

    for (let i = 0; i < this.distances.length - 1; i++) {
      const move = this.pick_move(
        this.pheromone[prev],
        this.distances[prev],
        visited
      );
      path.push(move);
      visited.add(move);
      prev = move;
    }

    return path;
  }

  pick_move(pheromone, dist, visited) {
    const pheromone_copy = [...pheromone];
    visited.forEach((v) => (pheromone_copy[v] = 0));

    const epsilon = 1e-10;
    const safe_dist = dist.map((d) => (d === 0 ? epsilon : d));
    let prob = pheromone_copy.map(
      (ph, i) =>
        Math.pow(ph, this.alpha) * Math.pow(1.0 / safe_dist[i], this.beta)
    );
    const prob_sum = prob.reduce((a, b) => a + b, 0);
    prob = prob.map((p) => p / prob_sum);

    return np_choice(this.all_inds, 1, prob)[0];
  }

  spread_pheromone(all_paths, n_best) {
    const sorted_paths = all_paths.sort((a, b) => a.dist - b.dist);

    for (const { path, dist } of sorted_paths.slice(0, n_best)) {
      for (let i = 0; i < path.length - 1; i++) {
        this.pheromone[path[i]][path[i + 1]] += 1.0 / dist;
        this.pheromone[path[i + 1]][path[i]] += 1.0 / dist; // Symmetric TSP
      }

      this.pheromone[path[path.length - 1]][path[0]] += 1.0 / dist;
      this.pheromone[path[0]][path[path.length - 1]] += 1.0 / dist;

      if (dist < this.best_length) {
        this.best_length = dist;
        this.best_path = path;
      }
    }
  }

  decay_pheromone() {
    this.pheromone = this.pheromone.map((row) =>
      row.map((p) => p * this.decay)
    );
  }
}
