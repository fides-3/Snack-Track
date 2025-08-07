
export async function POST (req:Request){
    const {query}=await req.json()
    const APP_ID="e0c25169"
    const API_KEY="8429c7867b3bca62b3ac1015ce459dc0"

    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': APP_ID,
      'x-app-key': API_KEY,
    },
    body: JSON.stringify({ query }),
  })
  const data=await req.json()
  const foodData=data?.foods?.[0]

  
  return new Response(JSON.stringify({ calories: foodData?.nf_calories || 0 }))

}