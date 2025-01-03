import JobBoard from "components/tesetjob/JobBoard";
import Banner from "components/Banner";

export default function Jobs() {
	return (
		<div className="bg-light pt-20">
			<JobBoard title={true} />
			<Banner
				title="Muốn đăng công việc của riêng bạn?"
				button="Đăng công việc"
				link="/sign-up/new-company"
			/>
		</div>
	);
}
