import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { num1, num2, operator } = await req.json()
    
    // Validate input
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || 
        !['+', '-', '*', '/'].includes(operator)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    let result
    switch (operator) {
      case '+':
        result = num1 + num2
        break
      case '-':
        result = num1 - num2
        break
      case '*':
        result = num1 * num2
        break
      case '/':
        if (num2 === 0) return NextResponse.json({ error: 'Division by zero' }, { status: 400 })
        result = num1 / num2
        break
      default:
        return NextResponse.json({ error: 'Invalid operator' }, { status: 400 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Calculation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
