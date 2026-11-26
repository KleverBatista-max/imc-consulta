# imc-consulta 1.0.0

## Español

Mini web local para calcular y clasificar el índice de masa corporal (IMC) en personas de 20 años o más. Es un apoyo y no sustituye el criterio clínico. El IMC por sí solo no distingue entre grasa y músculo.

- **Ejecución.** Abre `index.html` en un navegador con JavaScript. El cálculo funciona sin conexión y no guarda ni envía los valores.
- **Pruebas.** Ejecuta `node --test imc.test.mjs` con Node.js 18 o posterior. Las pruebas ejecutan el código de cálculo del HTML.
- **Fórmula y ejemplo.** IMC en kg/m² = peso (kg) ÷ (estatura en cm ÷ 100)². Con unidades estadounidenses se usa 703 × peso (lb) ÷ estatura (in)². Con 70 kg y 175 cm se obtiene 22,86 kg/m², peso saludable.
- **Límites de entrada.** De 1 a 500 kg y de 50 a 300 cm, o de 2 a 1100 lb y de 20 a 120 in. Los rangos son inclusivos y propios de la aplicación. Se admiten hasta tres decimales con punto o coma.

## English

Local web calculator for body mass index (BMI) and its category in adults aged 20 or older. It supports assessment and does not replace clinical judgment. BMI alone cannot distinguish fat from muscle.

- **Run.** Open `index.html` in a browser with JavaScript enabled. Calculations work offline and values are neither stored nor transmitted.
- **Test.** Run `node --test imc.test.mjs` with Node.js 18 or later. The tests execute the calculation code from the HTML.
- **Formula and example.** BMI in kg/m² = weight (kg) ÷ (height in cm ÷ 100)². With US customary units, use 703 × weight (lb) ÷ height (in)². With 70 kg and 175 cm, the result is 22.86 kg/m², healthy weight.
- **Input limits.** 1–500 kg and 50–300 cm, or 2–1100 lb and 20–120 in. These inclusive ranges are application limits. Enter up to three decimal places with a dot or comma.

## Categorías / Categories

| IMC / BMI (kg/m²) | Categoría / Category |
| --- | --- |
| < 18.5 | Bajo peso / Underweight |
| 18.5 a < 25 | Peso saludable / Healthy weight |
| 25 a < 30 | Sobrepeso / Overweight |
| 30 a < 35 | Obesidad de clase 1 / Class 1 obesity |
| 35 a < 40 | Obesidad de clase 2 / Class 2 obesity |
| ≥ 40 | Obesidad de clase 3 / Class 3 obesity |

Se clasifica antes de redondear a dos decimales. El signo `<` indica que el valor es inferior al umbral que mostraría el redondeo. / Classification precedes rounding to two decimal places. The `<` sign indicates that the value falls below the threshold it would round to.

Fuente oficial / Official source (CDC, 2024) · [Fórmulas / Formulas](https://www.cdc.gov/bmi/faq/index.html) · [Categorías para adultos / Adult categories](https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html)
