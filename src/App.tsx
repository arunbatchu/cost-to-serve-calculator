import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Calculator, TrendingUp, Users, DollarSign, Target, Zap } from 'lucide-react'
import './App.css'

interface CompanyScenario {
  name: string
  developers: number
  costPerDeveloper: number
  softwareUnits: number
  unitType: string
  description: string
}

const scenarios: CompanyScenario[] = [
  {
    name: 'Large Enterprise',
    developers: 1000,
    costPerDeveloper: 130000,
    softwareUnits: 2600,
    unitType: 'deployments',
    description: '1K developers, ~50 deployments per developer per year'
  },
  {
    name: 'Mid-size Tech Company',
    developers: 400,
    costPerDeveloper: 150000,
    softwareUnits: 1200,
    unitType: 'features',
    description: '400 developers, ~3 features per developer per year'
  },
  {
    name: 'Custom',
    developers: 100,
    costPerDeveloper: 120000,
    softwareUnits: 500,
    unitType: 'deployments',
    description: 'Enter your own organization parameters'
  }
]

function App() {
  const [selectedScenario, setSelectedScenario] = useState<string>('Large Enterprise')
  const [developers, setDevelopers] = useState<number>(1000)
  const [costPerDeveloper, setCostPerDeveloper] = useState<number>(130000)
  const [softwareUnits, setSoftwareUnits] = useState<number>(2600)
  const [unitType, setUnitType] = useState<string>('deployments')
  const [improvementPercentage, setImprovementPercentage] = useState<number[]>([15])
  const [implementationCost, setImplementationCost] = useState<number>(2000000)

  const currentScenario = scenarios.find(s => s.name === selectedScenario) || scenarios[0]

  const handleScenarioChange = (scenario: string) => {
    const selected = scenarios.find(s => s.name === scenario)
    if (selected) {
      setSelectedScenario(scenario)
      setDevelopers(selected.developers)
      setCostPerDeveloper(selected.costPerDeveloper)
      setSoftwareUnits(selected.softwareUnits)
      setUnitType(selected.unitType)
    }
  }

  const totalCurrentCost = developers * costPerDeveloper
  const costSavings = totalCurrentCost * (improvementPercentage[0] / 100)
  const roi = implementationCost > 0 ? (costSavings / implementationCost) : 0
  const paybackPeriod = costSavings > 0 ? (implementationCost / costSavings) : 0
  
  const currentCostPerUnit = softwareUnits > 0 ? totalCurrentCost / softwareUnits : 0
  const improvedCostPerUnit = softwareUnits > 0 ? (totalCurrentCost - costSavings) / softwareUnits : 0
  const costPerUnitSavings = currentCostPerUnit - improvedCostPerUnit

  const timelineData = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    cumulativeSavings: (costSavings * (i + 1) - implementationCost) / 1000000,
    annualSavings: costSavings / 1000000
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Cost to Serve Software Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the true cost of delivering software and quantify the business value of developer experience improvements.
          </p>
          
          <Card className="max-w-4xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-blue-900">Cost to Serve Software Formula</h2>
                <div className="text-2xl font-mono font-bold text-blue-800 bg-white p-4 rounded-lg border-2 border-blue-300">
                  CTS-SW = Total Development Cost ÷ Software Units Delivered
                </div>
                <p className="text-sm text-blue-700">
                  Measures the cost per unit of software delivered (deployments, features, releases, etc.)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Company Parameters
              </CardTitle>
              <CardDescription>Configure your organization's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scenario">Organization Type</Label>
                <Select value={selectedScenario} onValueChange={handleScenarioChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((scenario) => (
                      <SelectItem key={scenario.name} value={scenario.name}>
                        {scenario.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">{currentScenario.description}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="developers">Number of Developers</Label>
                <Input
                  id="developers"
                  type="number"
                  value={developers}
                  onChange={(e) => setDevelopers(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Cost per Developer (Annual)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={costPerDeveloper}
                  onChange={(e) => setCostPerDeveloper(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Software Units Delivered (Annual)</Label>
                <Input
                  id="units"
                  type="number"
                  value={softwareUnits}
                  onChange={(e) => setSoftwareUnits(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitType">Unit Type</Label>
                <Select value={unitType} onValueChange={setUnitType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deployments">Deployments</SelectItem>
                    <SelectItem value="features">Features</SelectItem>
                    <SelectItem value="releases">Releases</SelectItem>
                    <SelectItem value="stories">User Stories</SelectItem>
                    <SelectItem value="commits">Commits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expected Improvement: {improvementPercentage[0]}%</Label>
                <Slider
                  value={improvementPercentage}
                  onValueChange={setImprovementPercentage}
                  max={50}
                  min={5}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="implementation">Implementation Cost</Label>
                <Input
                  id="implementation"
                  type="number"
                  value={implementationCost}
                  onChange={(e) => setImplementationCost(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Financial Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Current CTS-SW</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">
                    ${currentCostPerUnit.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-700">per {unitType.slice(0, -1)}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Improved CTS-SW</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    ${improvedCostPerUnit.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-700">per {unitType.slice(0, -1)}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Unit Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    ${costPerUnitSavings.toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-700">per {unitType.slice(0, -1)}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Total Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    ${(costSavings / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-orange-700">annually</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">ROI</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {roi.toFixed(1)}x
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Payback Period</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {paybackPeriod.toFixed(1)} years
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cost per Unit Comparison</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { name: 'Current', cost: currentCostPerUnit / 1000, label: `$${currentCostPerUnit.toLocaleString()}` },
                      { name: 'Improved', cost: improvedCostPerUnit / 1000, label: `$${improvedCostPerUnit.toLocaleString()}` }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Cost ($K)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value: number) => [`$${(value * 1000).toLocaleString()}`, `Cost per ${unitType.slice(0, -1)}`]} />
                      <Bar dataKey="cost" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">5-Year Cumulative Savings</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Savings ($M)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`$${value}M`, 'Cumulative Savings']} />
                      <Line type="monotone" dataKey="cumulativeSavings" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Cost to Serve Software</CardTitle>
            <CardDescription>
              Key insights about measuring and improving software delivery efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What is CTS-SW?</h3>
                <p className="text-sm text-gray-700">
                  Cost to Serve Software (CTS-SW) is a metric that measures the total cost of delivering a unit of software. 
                  It provides a clear, quantifiable way to understand the efficiency of your software development process.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Formula:</p>
                  <p className="text-lg font-mono font-bold text-blue-800">
                    CTS-SW = Total Development Cost ÷ Software Units
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Why It Matters</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Quantifies efficiency:</strong> Provides concrete metrics for software delivery</li>
                  <li>• <strong>Enables comparison:</strong> Compare efficiency across teams, projects, or time periods</li>
                  <li>• <strong>Justifies investment:</strong> Show ROI of developer experience improvements</li>
                  <li>• <strong>Drives decisions:</strong> Make data-driven choices about tooling and processes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 bg-blue-50">
            <p className="text-sm text-blue-800 text-center">
              Need to estimate modernization costs? 
              <a href="https://modernization-estimator.app" className="underline ml-1">
                Try our Technology Modernization Cost Estimator
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
