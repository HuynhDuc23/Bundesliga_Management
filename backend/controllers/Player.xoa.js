import Player from "../models/Player.model.js";

export const getAllPlayersWithStatusZero = async (req, res) => {
    try {
        // Lấy tất cả các cầu thủ có status = 0 từ cơ sở dữ liệu
        const players = await Player.find({ status: 0 });
        // Trả về JSON chứa danh sách các cầu thủ
        return res.status(201).json({
            data: players,
        });
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình lấy dữ liệu
        console.error('Error getting players:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const updatePlayerStatus = async (req, res) => {
    try {
        const { playerIds } = req.body;

        // Cập nhật status của các player có trong playerIds từ 0 sang 1
        await Player.updateMany(
            { _id: { $in: playerIds } },
            { $set: { status: 1 } }
        );

        res.status(200).json({ message: 'Player status updated successfully' });
    } catch (error) {
        console.error('Error updating player status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};