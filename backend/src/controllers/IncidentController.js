const connection = require('../database/connection');

module.exports = {

  async create(req, res){
    const {title, description, value} = req.body;
    const ong_id = require.headers.authorization;
  
    const [id] = await connection('incidents').insert({
      title,                                                                                                                                                                                                                                                                                                                                                                                                            
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },

  async index (req, res){
    const { page = 1} = request.query;

    const count = await connection('incidents').count();
    
    const incidents = await connection('incidents')
    .join('ongs', 'ong.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ]);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
  },


  async delete(req, res){
    const { id } = request.params;
    const ong_id = require.headers.authorization;

    const incident = await connection('incidents')
    .where('id',id)
    .select('ong_id')
    .first();

    if (incident.ongs_id != ong_id){
      return res.status(404).json({ error: "Operation not permitted"});
    }

    await connection('incidents').where('id',id).delete()
    return res.status(204).send();
  }

}