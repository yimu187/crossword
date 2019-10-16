exports.handler = (event, context, callback) => {
    const respData = {

        questionsDataX : [
            {s:'Soldan Sağa',sn:'', c:-1, ybas: -1, ybit: -1, xbas: -1, xbit:-1},
            {s:'Geviş getirenlerden, Kongo’da bataklık ormanlarda yaşayan, büyük bir antilop boyunda, gövdesi kızıl kestane renginde, bacakları beyaz çizgili bir memeli hayvan', sn:1, c:'OKAPİ', ybas: 0, ybit: 0, xbas: 0, xbit:4},
            {s:'İlave', sn:2, c:'EK', ybas: 0, ybit: 0, xbas: 6, xbit:7},
            {s:'Erkek Kardeş', sn:3, c:'BİRADER', ybas: 1, ybit: 1, xbas: 0, xbit:6},
            {s:'Bir organımız',sn:4 ,c:'EL', ybas: 2, ybit: 2, xbas: 0, xbit:1},
            {s:'Bir Meyve', sn:5, c:'KİRAZ', ybas:2, ybit: 2, xbas: 3, xbit:7},
            {s:'Küçük çan',c:'ZİL', sn:6, ybas: 3, ybit: 3, xbas: 0, xbit:2},
            {s:'Bal koymaya yarayan küçük tekne', sn:7, c:'LAZA', ybas: 3, ybit: 3, xbas: 4, xbit:7},
            {s:'Ad', sn:8, c:'İSİM', ybas: 4, ybit: 4, xbas: 0, xbit:3},
            {s:'Eski Dilde Çöl', sn:9, c:'TİH', ybas: 4, ybit: 4, xbas: 5, xbit:7},
            {s:'Mersin’in bir ilçesi', sn:10, c:'MUT', ybas: 5, ybit: 5, xbas: 2, xbit:4},
            {s:'Lityum elementinin simgesi', sn:11, c:'Lİ', ybas: 5, ybit: 5, xbas: 6, xbit:7},
            {s:'Mitoloji', sn:12, c:'ESATİR', ybas: 6, ybit: 6, xbas: 0, xbit:5},
            {s:'Halk dilinde kayınbirader', sn:13, c:'İNİ', ybas: 7, ybit: 7, xbas: 1, xbit:3},
            {s:'Kraliçe.', sn:14, c:'ECE', ybas: 7, ybit: 7, xbas: 5, xbit:7}
        ],

        questionsDataY : [
            {s: 'Yukarıdan Aşağıya', sn:'', c:-1, ybas: -1, ybit: -1, xbas: -1, xbit:-1},
            {s:'Aşırı şişmanlık', sn:1, c:'OBEZİTE', ybas: 0, ybit: 6, xbas: 0, xbit:0},
            {s:'Eski dilde reziller', sn:2, c:'ERAZİL', ybas: 0, ybit: 5, xbas: 6, xbit:6},
            {s:'Bir ilimiz', sn:15, c:'KİLİS', ybas: 0, ybit: 4, xbas: 1, xbit:1},
            {s:'Bir nota', sn:16, c:'Sİ', ybas: 6, ybit: 7, xbas: 1, xbit:1},
            {s:'Hicap', sn:17, c:'AR', ybas: 0, ybit: 1, xbas: 2, xbit:2},
            {s:'Gemi barınağı', sn:18, c:'LİMAN', ybas: 3, ybit: 7, xbas: 2, xbit:2},
            {s:'Temiz', sn:19, c:'PAK', ybas: 0, ybit: 2, xbas: 3, xbit:3},
            {s:'Yumuşak başlı, itaat eden',sn:20, c:'MUTİ', ybas: 4, ybit: 7, xbas: 3, xbit:3},
            {s:'Şırnak’ın bir ilçesi', sn:21, c:'İDİL', ybas: 0, ybit: 3, xbas: 4, xbit:4},
            {s:'Boru sesi', sn:22, c:'Tİ', ybas: 5, ybit: 6, xbas: 4, xbit:4},
            {s:'Rütbesiz askerlerin tümü', sn:23, c:'ERAT', ybas: 1, ybit: 4, xbas: 5, xbit:5},
            {s:'Bir nota', sn:24, c:'RE', ybas: 6, ybit: 7, xbas: 5, xbit:5},
            {s:'Gerektiğinde kullanılmak için saklanan tahıl.', sn:25, c:'ZAHİRE', ybas: 2, ybit: 7, xbas: 7, xbit:7}
        ]
    };
    callback(null, respData)
};
