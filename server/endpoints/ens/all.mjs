import { success, userError } from '../../utils/helpers.mjs';
import server from '../../server.mjs';
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const get = async (req, res) => {
	let { address, page } = req.query;

	if (!address) return userError(res, 'Missing address');

	let enses = await server.prisma.eNS.findMany({
		where: {
			ownerAddress: address,
		},
		skip: page * server.config.magicMirror.pageSize,
		take: server.config.magicMirror.pageSize,
	});

	return success(res, {
		nfts: enses,
	});
};
