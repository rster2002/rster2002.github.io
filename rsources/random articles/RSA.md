# RSA

[toc]

## Generating keys

For the RSA algorith to work, you need two large primes $p$ and $q$ which together will make $n$. $n$ should be some length of bits (usually 4096, but in this example we will use 1024 bits).

First pick $e$. this is part of the public part of your key. A common pick for $e$ is $65537$, but can technically be any prime number. $65537$ is used because it really doesn't need to be that big.

Generating $p$ and $q$ is done by first generating a random bit sequence with a length of $k/2$ and $k-(k/2)$ where $k$ is the number of bits required by $n$ and settings the two first and the last bits to 1 then checking whether or not it's a prime using something like the miller rabin algorith. Another condition is that $p \mod e \neq1$ If it's not a prime: increment by two and check again.

Computing $n$ is really simple after you've computed $p$ and $q$ because it's the multiple of them together: $n=pq$. After that we need to compute $\phi$ which is $\phi=(p-1)(q-1)$. After that we compute $d$ which is our private component: $d=e^{-1}\mod \phi$
$$
e=65537\\
p = \text{genprime}(k/2) \\
q = \text{genprime}(k - (k/2)) \\
n = pq \\
\phi=(p-1)(q-1) \\
d = e^{-1} \mod \phi
$$

<button>Something cool</button>

<div>
    <input type="number" placeholder="Some key" />
</div>

