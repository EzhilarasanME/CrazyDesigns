import { sql } from '@vercel/postgres';
 
export default async function queryPosts() {
  debugger
 
  try {
    console.log( "start sql")

    const { rows, fields } =
      await sql`select ct.id,ct.template_name,ct.amount,ct.video_link, ctd.image_link, ctd.size_type, ctd.slide_number from dbo.cd_templates ct
      inner join dbo.cd_templates_Detail ctd on ct.id = ctd.template_id where id >0;`;
      debugger
    console.log( "end sql")

      console.log( rows, fields)
  } finally {
    await console.log("queryPosts failed");
  }
}