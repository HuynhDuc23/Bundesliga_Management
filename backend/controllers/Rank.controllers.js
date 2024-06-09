import MatchTeam from '../models/MatchTeam';

export const getRanking = async (req, res) => {
    const { seasonId } = req.params; // Lấy ID của mùa giải từ request

    try {
        // Lấy tất cả các MatchTeam thuộc mùa giải cụ thể
        const allMatchTeams = await MatchTeam.find({ 'ID_match.ID_season': seasonId })
            .populate('ID_team') // Populate thông tin đội bóng
            .exec();

        // Tính điểm cho từng đội
        const teamScores = {};
        allMatchTeams.forEach(matchTeam => {
            if (!teamScores[matchTeam.ID_team._id]) {
                teamScores[matchTeam.ID_team._id] = {
                    name: matchTeam.ID_team.name,
                    logo: matchTeam.ID_team.logo,
                    score: 0
                };
            }
            if (matchTeam.goal > allMatchTeams.find(mt => mt.ID_match === matchTeam.ID_match && mt.ID_team !== matchTeam.ID_team).goal) {
                teamScores[matchTeam.ID_team].score += 3; // Đội thắng được 3 điểm
            } else if (matchTeam.goal === allMatchTeams.find(mt => mt.ID_match === matchTeam.ID_match && mt.ID_team !== matchTeam.ID_team).goal) {
                teamScores[matchTeam.ID_team].score += 1; // Hòa được 1 điểm
            }
            // Không thêm điểm cho đội thua
        });

        // Chuyển object thành mảng để sắp xếp theo điểm số
        const sortedTeams = Object.values(teamScores).sort((a, b) => b.score - a.score);

        // Render trang rank.ejs với dữ liệu của các đội đã sắp xếp
        res.render('rank', { teams: sortedTeams });
    } catch (error) {
        console.error('Error getting ranking:', error);
        res.status(500).render("pages/error", { data: "Failed to get ranking" });
    }
};