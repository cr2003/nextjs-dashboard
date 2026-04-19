import { sql } from '@vercel/postgres';

// DELETE the 'import postgres' line
// DELETE the 'const sql = postgres...' line

async function listInvoices() {
  // Now this uses the 'sql' we imported on Line 1
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data.rows;
}

export async function GET() {
  try {
    const result = await listInvoices();
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}