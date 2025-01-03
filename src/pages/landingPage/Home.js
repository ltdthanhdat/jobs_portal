import Content from "components/content";
import HowItWorks from "components/HowItWorks";
import Banner from "components/Banner";
import SocialMedia from "components/SocialMedia";
import Trusted from "components/Trusted";
import JobBoard from "components/tesetjob/JobBoard";
import { userType } from "libs/isAuth";
import { CompanyBanner } from "components/CompanyBanner";

function Home() {
	return (
		<div>
			{/* <Content /> */}
			{/* <Trusted /> */}
			<HowItWorks />
			<JobBoard title={false} />
			{/* <CompanyBanner type={userType} /> */}
			{/* <SocialMedia /> */}

			<Banner
				title="Sẵn sàng ứng tuyển công việc?"
				button="Khám phá bảng việc làm"
				link="/jobs"
				type={userType}
			/>
		</div>
	);
}

export default Home;
