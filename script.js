const Calculer = document.querySelector('input[type=button]');

Calculer.addEventListener('click', calcIP);


function toString(data) {
	var str = (data >> 24 & 0xFF).toString() + "." +
		(data >> 16 & 0xFF).toString() + "." + (data >> 8 & 0xFF).toString() + "." + (data & 0xFF).toString();
	return str;
}

function calcIP() {

	var form = document.querySelector('form');
	// console.log(form.sminput.value);

	var inputip = (form.ipinput.value);
	var inputmask = (form.sminput.value)

	var ip = inputip.split('.');

	var masque = inputmask.split('.');
	var mask = parseInt(masque[0]) << 24 | parseInt(masque[1]) << 16 | parseInt(masque[2]) << 8 | parseInt(masque[3]);

	var CIDR = 0;
	var m = mask;
	for (var i = 0; i < 32; i++) {
		if ((m & 0x01) == 0x00) CIDR++;
		else break;
		m= m >> 1;
	}
	//  console.log(ip, mask.toString(16), masque,  CIDR);
	var IP = parseInt(ip[0]) << 24 | parseInt(ip[1]) << 16 | parseInt(ip[2]) << 8 | parseInt(ip[3]);


	form.subsizebits.value = 32-CIDR;
	form.hostsizebits.value = CIDR;

	// network address
	var adrN = IP & mask;
	form.subnetaddress.value = toString(adrN);

	// first address
	var adrFirst = adrN + 1;
	form.starthost.value = toString(adrFirst);

	// boroadcast address
	var adrDiff = adrN | ~mask;
	form.broadcastaddress.value = toString(adrDiff);

	// last address
	var adrLast = adrDiff - 1;
	form.endhost.value  = toString(adrLast);

	// hosts number
	var nb = Math.pow(2, CIDR) - 2;
	form.numofhosts.value = nb;

}

// exercice : fonction à écrire et à valider 
function checkInput(ipp, cd) {
	// A FAIRE
	return true;
}
