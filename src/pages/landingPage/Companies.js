import CompanyBoard from "components/CompanyBoard";
import Banner from "components/Banner";

function Companies() {
	return (
		<div className="pt-32 bg-light">
			<CompanyBoard />
			<Banner
				title="Muốn đăng công việc của riêng bạn?"
				button="Đăng công việc"
				link="/sign-up/new-recruiter"
			/>
		</div>
	);
}

export default Companies;
