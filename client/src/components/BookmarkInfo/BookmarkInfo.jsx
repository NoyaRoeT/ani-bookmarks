import {
	Dialog,
	DialogContent,
	Typography,
	Box,
	Divider,
	Stack,
	Paper,
} from "@mui/material";

const Item = ({ color, children }) => {
	return (
		<Paper
			sx={{
				fontSize: "12px",
				color: "white",
				px: "8px",
				py: "4px",
				bgcolor: color,
			}}
		>
			{children}
		</Paper>
	);
};

const BookmarkInfo = () => {
	return (
		<Dialog scroll="body" fullWidth open maxWidth="md">
			<DialogContent>
				<Box sx={{ display: "flex" }}>
					<Box pr={"24px"} maxWidth={"244px"} minWidth={"224px"}>
						<img
							width={"100%"}
							height={"300px"}
							src="https://via.placeholder.com/400"
						/>
					</Box>
					<Divider flexItem orientation="vertical" />
					<Box sx={{ p: "12px" }}>
						<Typography variant="h5">
							Tensei Shitara Slime Datta Ken
						</Typography>
						<Divider sx={{ my: "12px" }} />
						<Stack spacing={1} direction="row">
							<Item color="#1565c0">Action</Item>
							<Item color="#1565c0">Fantasy</Item>
							<Item color="#42a5f5">Sci-Fi</Item>
							<Item color="#42a5f5">Regression</Item>
							<Item color="#42a5f5">Isekai</Item>
						</Stack>
						<Divider sx={{ my: "12px" }} />
						<Typography variant="body1">
							That Time I Got Reincarnated as a Slime (Japanese:
							転生したらスライムだった件, Hepburn: Tensei Shitara
							Suraimu Datta Ken), also known as Regarding
							Reincarnated to Slime[b] and short name TenSura
							(転スラ), is a Japanese fantasy light novel series
							written by Fuse [ja], and illustrated by Mitz Vah.
							The story is about a salaryman who is murdered and
							reincarnates in a sword and sorcery world as a slime
							with unique powers and gathers allies to build his
							own nation of monsters. It was serialized online
							from 2013 to 2016 on the user-generated novel
							publishing website Shōsetsuka ni Narō. It was later
							acquired by Micro Magazine, which published the
							first light novel volume in 2014. Twenty volumes
							have been released as of September 2022. The light
							novel has been licensed in North America by Yen
							Press, who published the first volume in December
							2017. It has received a manga adaptation published
							by Kodansha along with five manga spin-offs
							published, respectively, by Micro Magazine and
							Kodansha and an anime television series adaptation
							produced by Eight Bit, which aired from October 2018
							to March 2019. A second season of the anime series
							aired from January to September 2021, and an anime
							adaptation of the second spin-off manga aired from
							April to June 2021. An anime film was released in
							November 2022. A three-episode original net
							animation spin-off titled Coleus no Yume is set to
							premiere in Q4 2023. A third season is set to
							premiere in Q2 2024.That Time I Got Reincarnated as
							a Slime (Japanese: 転生したらスライムだった件,
							Hepburn: Tensei Shitara Suraimu Datta Ken), also
							known as Regarding Reincarnated to Slime[b] and
							short name TenSura (転スラ), is a Japanese fantasy
							light novel series written by Fuse [ja], and
							illustrated by Mitz Vah. The story is about a
							salaryman who is murdered and reincarnates in a
							sword and sorcery world as a slime with unique
							powers and gathers allies to build his own nation of
							monsters. It was serialized online from 2013 to 2016
							on the user-generated novel publishing website
							Shōsetsuka ni Narō. It was later acquired by Micro
							Magazine, which published the first light novel
							volume in 2014. Twenty volumes have been released as
							of September 2022. The light novel has been licensed
							in North America by Yen Press, who published the
							first volume in December 2017. It has received a
							manga adaptation published by Kodansha along with
							five manga spin-offs published, respectively, by
							Micro Magazine and Kodansha and an anime television
							series adaptation produced by Eight Bit, which aired
							from October 2018 to March 2019. A second season of
							the anime series aired from January to September
							2021, and an anime adaptation of the second spin-off
							manga aired from April to June 2021. An anime film
							was released in November 2022. A three-episode
							original net animation spin-off titled Coleus no
							Yume is set to premiere in Q4 2023. A third season
							is set to premiere in Q2 2024.That Time I Got
							Reincarnated as a Slime (Japanese:
							転生したらスライムだった件, Hepburn: Tensei Shitara
							Suraimu Datta Ken), also known as Regarding
							Reincarnated to Slime[b] and short name TenSura
							(転スラ), is a Japanese fantasy light novel series
							written by Fuse [ja], and illustrated by Mitz Vah.
							The story is about a salaryman who is murdered and
							reincarnates in a sword and sorcery world as a slime
							with unique powers and gathers allies to build his
							own nation of monsters. It was serialized online
							from 2013 to 2016 on the user-generated novel
							publishing website Shōsetsuka ni Narō. It was later
							acquired by Micro Magazine, which published the
							first light novel volume in 2014. Twenty volumes
							have been released as of September 2022. The light
							novel has been licensed in North America by Yen
							Press, who published the first volume in December
							2017. It has received a manga adaptation published
							by Kodansha along with five manga spin-offs
							published, respectively, by Micro Magazine and
							Kodansha and an anime television series adaptation
							produced by Eight Bit, which aired from October 2018
							to March 2019. A second season of the anime series
							aired from January to September 2021, and an anime
							adaptation of the second spin-off manga aired from
							April to June 2021. An anime film was released in
							November 2022. A three-episode original net
							animation spin-off titled Coleus no Yume is set to
							premiere in Q4 2023. A third season is set to
							premiere in Q2 2024.
						</Typography>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default BookmarkInfo;
