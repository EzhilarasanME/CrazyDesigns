import { createPool } from '@vercel/postgres';

 
export async function getTemplateList() {
  
 
  try {
    const pool = createPool({
      connectionString: process.env.REACT_APP_EziTech_URL,
    });
    console.log( "start sql")

    const { rows } =
      await pool.sql `select ct.id,ct.template_name,ct.amount,ct.video_link, ctd.image_link, ctd.size_type, ctd.slide_number from dbo.cd_templates ct inner join dbo.cd_templates_Detail ctd on ct.id = ctd.template_id where ct.id > 0;`;
      
    console.log( "end sql")

    return rows;
  } finally {
    console.log("queryPosts failed");
  }
}