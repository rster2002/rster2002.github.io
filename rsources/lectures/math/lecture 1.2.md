# Lecture 1.2

## Alle delers vinden

### Algoritme

1. Deel eerst door `1` en deel daarna telkens door het getal daarna, totdat je een combinatie van een deler en een antwoord die je al heb gehad.

### Voorbeeld opgave

Vind alle delers van `28`
$$
28 / 1 = 28 \\
28 / 2 = 14 \\
28 / 4 = 7 \\
$$
De delers van `28` zijn dus `1, 2, 4, 7, 14, 28`.

> ###### Sidenote
>
> Je kan $28 / 7 = 4$ doen, maar omdat we al $28 / 4 = 7$ hebben we die dus al noteren, stoppen we hier omdat je hierna geen delers meer gaat vinden die je niet al heb.

## Grootste Gemeenschappelijke Deler (GGD)

### Algoritme

1. Voer de priem factorizatie uit voor beide getallen.
2. Vind de priemgetallen die in beide reeksen voorkomen.
3. Neem die getallen keer elkaar. Dat is de GGD

### Voorbeeld opgave

Vind de GGD voor `45` en `225`.
$$
45 = \overbrace{3 \times 3 \times 5}^\text{gelijk} \\
225 = \underbrace{3 \times 3 \times 5}_{\text{gelijk}} \times 5 \\
3 \times 3 \times 5 = 45
$$
De GGD voor `45` en `225` is dus `45`.

## Kleinste Gemeenschappelijke Veelvoud (KGV)

### Algoritme

1. Voer de priem factorizatie uit voor beide getallen.
2. Vind de factoren die overeen komen in beide gevallen en streep daarvan een weg

### Voorbeeld opgave

Vind de KGV voor `27` en `45`.
$$
27 = 3 \times 3 \times 3 \\
45 = 3 \times 3 \times 5
$$

$$
27 = \overbrace{3 \times 3}^{\text{match}} \times 3 \\
45 = \underbrace{3 \times 3}_{\text{match}} \times 5 \\
3 \times 3 \times 3 \times 5 = 135
$$

