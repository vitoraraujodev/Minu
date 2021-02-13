import axios from 'axios';

const endPoint = 'http://notifications_service.seuminu.com:5000/open-calls';

class WaiterCallController {
    async index(req, res) {
        const establishmentId = req.params.id;
        const openCallsEndpoint = `${endPoint}/${establishmentId}`;

        try {
            var open_calls_response = await axios.get(openCallsEndpoint);
            return res.status(200).json(open_calls_response.data);
        } catch (err) {
            return res.status(400).json({
                error:
                'Houve um erro ao recuperar as chamadas. Verifique sua conexão e tente novamente.',
            });
        }
    }
}

export default new WaiterCallController();
