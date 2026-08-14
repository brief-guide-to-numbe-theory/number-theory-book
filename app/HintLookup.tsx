"use client";

import { useMemo, useRef, useState } from "react";

const seeds = [
  "Translate the statement into the definition of divisibility before doing any algebra.",
  "Factor out the greatest common divisor before comparing divisibility conditions.",
  "Write an integer in quotient-remainder form to split the proof into cases.",
  "Try the Euclidean algorithm when two integers appear symmetrically.",
  "Look for a Bezout identity when a gcd equals one.",
  "Use prime factor exponents when products, powers, gcds, and lcms occur together.",
  "Count divisors by choosing exponents in the prime factorization independently.",
  "To prove a number is prime, test only prime divisors up to its square root.",
  "When a prime divides a product, Euclid's lemma can isolate a factor.",
  "Check the exceptional prime 2 separately whenever parity matters.",
  "For consecutive integers, use the fact that their gcd is one.",
  "Compute a valuation one prime at a time when repeated factors matter.",
  "Reduce large bases before taking powers modulo an integer.",
  "Search for the multiplicative order when powers repeat modulo the same integer.",
  "Use the Chinese remainder theorem when the modulus factors into coprime pieces.",
  "To find a modular inverse, read it from a Bezout identity.",
  "List the possible square residues modulo 4, 8, or 16.",
  "For a linear Diophantine equation, check the gcd condition first.",
  "Once one solution to ax+by=c is known, write the full one-parameter family.",
  "Factor a difference of squares before treating it as a two-variable equation.",
  "Use congruences to rule out an integer equation before parameterizing it.",
  "When an equation is symmetric in x and y, introduce their sum and product.",
  "For a multiplicative arithmetic function, find its values on prime powers first.",
  "Count solutions modulo a composite number locally at prime powers, then recombine.",
  "Before invoking a deep theorem, isolate the elementary lemma carrying the special case.",
];

const refinements = [
  "Write the key implication on its own line.",
  "Test the smallest nontrivial example.",
  "Keep necessity and sufficiency separate.",
  "Name every integer witness explicitly.",
  "State where each hypothesis enters.",
  "Check a boundary case before generalizing.",
  "Look for a contradiction if a direct proof becomes circular.",
  "Record coprimality before cancelling.",
  "Return to the original claim after simplifying.",
  "Translate the result back into the problem's notation.",
  "Try a small residue table before guessing a pattern.",
  "Separate the exceptional even case.",
  "Check whether the converse is also needed.",
  "Use the smallest positive representative.",
  "Compare prime exponents on both sides.",
  "Verify that no solution was lost during division.",
  "Write the intended contradiction explicitly.",
  "Identify the invariant preserved by the next step.",
  "Keep the modulus visible throughout the calculation.",
  "Finish with one sentence connecting the calculation to the conclusion.",
];

type Hint = { id: number; text: string };

const hints: Hint[] = seeds.flatMap((seed, seedIndex) =>
  refinements.map((refinement, refinementIndex) => ({
    id: seedIndex * refinements.length + refinementIndex + 1,
    text: `${seed} ${refinement}`,
  })),
);

export default function HintLookup() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [hint, setHint] = useState<Hint | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const canReveal = value.length === 3;

  const resultNumber = useMemo(
    () => (hint ? String(hint.id).padStart(3, "0") : ""),
    [hint],
  );

  function concealHint() {
    setHint(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = event.target.value.replace(/\D/g, "").slice(0, 3);
    setValue(cleaned);
    setError("");
    concealHint();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (value.length !== 3) {
      concealHint();
      setError("Enter all three digits before revealing a hint.");
      return;
    }

    const number = Number(value);
    if (number < 1 || number > hints.length) {
      concealHint();
      setError("Choose a hint number from 001 to 500.");
      return;
    }

    setError("");
    setHint(hints[number - 1]);
  }

  function handleHide() {
    concealHint();
    setValue("");
    setError("");
    inputRef.current?.focus();
  }

  return (
    <>
      <form className="lookup-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="hintNumber">Enter a three-digit hint number</label>

        <div className="lookup-row">
          <div className="number-field">
            <span aria-hidden="true">#</span>

            <input
              ref={inputRef}
              id="hintNumber"
              name="hintNumber"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{3}"
              maxLength={3}
              placeholder="001"
              autoComplete="off"
              value={value}
              onChange={handleChange}
              aria-describedby="hintHelp hintError"
              aria-invalid={error ? "true" : undefined}
            />
          </div>

          <button type="submit" disabled={!canReveal}>
            Reveal hint <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <p className="lookup-help" id="hintHelp">
          Enter the full number from 001 to 500. Partial numbers reveal nothing.
        </p>

        <p className="hint-error" id="hintError" role="alert" hidden={!error}>
          {error}
        </p>
      </form>

      <article className="hint-result" aria-live="polite" hidden={!hint}>
        <p className="result-label">YOUR HINT</p>

        <p className="revealed-hint">
          <span className="hint-number">{resultNumber}</span>
          <span className="hint-colon">:</span>
          <span>{hint?.text}</span>
        </p>

        <button type="button" onClick={handleHide}>
          Hide this hint
        </button>
      </article>
    </>
  );
}
