// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    console.log(process)
  res.statusCode = 200
  res.json({ name: 'John Doe',env:process.env })
}
