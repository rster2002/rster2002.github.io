# Lecture 1

[toc]

## Propositie

Een objectief controleerbare expressie die je kan controleren met alle data in de expressie.

## Symbolen

| Symbool   | Implicatie      | Voorbeeld                                           |
| --------- | --------------- | --------------------------------------------------- |
| =>        | If ... then ... |                                                     |
| ¬         | NOT             |                                                     |
| ^         | AND             |                                                     |
| $\subset$ | Subset van      | $\{0, 1\} \subset \{0, 1, 2, 3\}$                   |
| $\in$     | Element an      |                                                     |
| $X$       |                 | $\{1, 2\}X\{3, 4\} = \{(1,3), (1,4), (2,3), 2,4)\}$ |

_[Zie Wikipedia](https://en.wikipedia.org/wiki/List_of_logic_symbols)_

I study, do my homework and participate during class, or I will not pass the exam

If p & q & r, then s

(p ^ q ^ r) V s

p: do study

q: do homework

r: participate during class

s: pass the exam

| p    | q    | r    | ¬p     | ¬p => r    | q ^ r     | (¬p => r) V (q ^ r) |
| ---- | ---- | ---- | ------ | ---------- | --------- | ------------------- |
| 0    | 0    | 0    | ¬0 = 1 | 1 => 0 = 0 | 0 ^ 0 = 0 | 0 V 0 = 0           |
| 0    | 0    | 1    | ¬0 = 1 | 1 => 1 = 1 | 0 ^ 1 = 0 | 1 V 0 = 1           |
| 0    | 1    | 0    | ¬0 = 1 | 1 => 0 = 0 | 1 ^ 0 = 0 |                     |

$$
A = \{3, 5, 8\} = \{3, 3, 5, 8\} = \{3, 3, 3, 5, 8\}
$$

