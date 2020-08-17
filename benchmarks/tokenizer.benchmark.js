const fs = require('fs')
const Benchmark = require('benchmark')
const { initializeBenchmark } = require('./shared/cases')

const cssBootstrap = fs.readFileSync(require.resolve('bootstrap/dist/css/bootstrap.css'), { encoding: 'utf-8' })
const cssTailwind = fs.readFileSync(require.resolve('tailwindcss/dist/tailwind.css'), { encoding: 'utf-8' })

const suiteBootstrap = initializeBenchmark(new Benchmark.Suite('Bootstrap'), cssBootstrap)
const suiteTailwind = initializeBenchmark(new Benchmark.Suite('Tailwind'), cssTailwind)

suiteTailwind.run()
suiteBootstrap.run()
