let data = [{
	name: "Asd",
	id: "asd",
	children: [
	{
		name: "sdf",
		id: "sdf",
		children: [{name: "qwe", id: "qwe"}]
	}
	]
}];

function populateProvisions(data) {
	const prov = data.map(d => {
		if (d.children && d.children.length > 0) {
			const children = d.children.map(d1 => {
				if (d1.children && d1.children.length > 0) {
					const children1 = d1.children.map(d2 => {
						d2.checked = false;
						return d2;
					});
					d1.isParent = true;
					d1.className = "box";
					d1.children = children1;
				}
				d1.checked = false;
				return d1;
			});
			d.isParent = true;
			d.className = "box";
			d.children = children;
		}
		d.checked = false;
		return d;
	});
	return prov;
}

function onClickParent(eleId) {
	//const eleId = event.target.id;
	const prov = data.map(d => {
		if (eleId === d.id) {
			d.checked = !d.checked;
		}
		if (d.children && d.children.length > 0) {
			const children = d.children.map(d1 => {
				if (eleId === d1.id) {
					d1.checked = !d1.checked;
				} else {
					d1.checked = d.checked;
				}
				if (d1.children && d1.children.length > 0) {
					const children1 = d1.children.map(d2 => {
						d2.checked = d1.checked;
						return d2;
					});
					d1.children = children1;
				}
				return d1;
			});
			d.children = children;
		}
		return d;
	});
	return prov;
}

function setCheckboxClass() {
	const prov = data.map(d => {
		if (d.children && d.children.length > 0) {
			const children = d.children.map(d1 => {
				if (d1.children && d1.children.length > 0) {
					const cnt_children1 = d1.children.length;
					const chk_children1 = d1.children.filter(d2 => d2.checked).length;
					if (chk_children1 === 0) {
						d1.className = "box";
						d1.checked = false;
					} else if (chk_children1 === cnt_children1) {
						d1.className = "box box-checked";
						d1.checked = true;
					} else {
						d1.className = "box box-minus";
						d1.checked = false;
					}
				}
				return d1;
			});
			
			const cnt_children = d.children.length;
			const chk_children = d.children.filter(d2 => d2.checked).length;
			const prt_minus_children = d.children.filter(d2 => d2.isParent && d2.className === "box box-minus").length;
			if (prt_minus_children > 0) {
				d.className = "box box-minus";
			} else if (chk_children === cnt_children) {
				d.className = "box box-checked";
			} else {
				d.className = "box";
			}
			d.children = children;
		}
		return d;
	});
	return prov;
}
