/**
 * Oddaja obrazca za brezplačno uvodno uro.
 * Teče kot Cloudflare Pages Function na POST /api/prijava.
 *
 * Skrivnosti in nastavitve (wrangler pages secret put ... --project-name gbdomzale):
 *   RESEND_API_KEY  obvezno, ključ iz resend.com
 *   MAIL_TO         kam pride prijava, privzeto info@gbdomzale.si
 *   MAIL_FROM       pošiljatelj; dokler domena ni potrjena pri Resend, onboarding@resend.dev
 *   MAIL_CONFIRM    "on" pošlje potrditev tudi prijavljenemu (šele ko je domena potrjena)
 */

const PROGRAMI = {
  gbk: 'Otroci (GBK)',
  gb1: 'Odrasli začetniki (GB1)',
  gb2: 'Z izkušnjami (GB2/GB3)',
  gbf: 'Ženske (GBF)',
  nogi: 'No-Gi',
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const veljavenEmail = (v) => /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/.test(v) && v.length <= 120;

async function posljiPosto(env, { from, to, replyTo, subject, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

export async function onRequestPost({ request, env }) {
  let v;
  try {
    v = await request.json();
  } catch {
    return json(400, { ok: false, napaka: 'Neveljavna prijava.' });
  }

  // Past za robote: polje je skrito, človek ga ne izpolni.
  if (v.website) return json(200, { ok: true });

  const ime = String(v.name || '').trim();
  const email = String(v.email || '').trim();
  const tel = String(v.tel || '').trim();
  const program = PROGRAMI[v.prog] || null;
  const termin = String(v.slot || '').trim();

  if (ime.length < 2 || ime.length > 80) return json(400, { ok: false, napaka: 'Vpiši ime in priimek.' });
  if (!veljavenEmail(email)) return json(400, { ok: false, napaka: 'Vpiši veljaven e-naslov.' });
  if (tel.length > 40) return json(400, { ok: false, napaka: 'Telefonska številka je predolga.' });
  if (!program) return json(400, { ok: false, napaka: 'Izberi program.' });
  if (!termin || termin.length > 160) return json(400, { ok: false, napaka: 'Izberi termin.' });
  if (v.consent !== true) return json(400, { ok: false, napaka: 'Potrebujemo tvoje soglasje za obdelavo podatkov.' });

  if (!env.RESEND_API_KEY) {
    return json(503, { ok: false, napaka: 'Oddaja še ni nastavljena. Piši nam na info@gbdomzale.si.' });
  }

  const to = env.MAIL_TO || 'info@gbdomzale.si';
  const from = env.MAIL_FROM || 'Gracie Barra Domžale <onboarding@resend.dev>';
  const besedilo = [
    'Nova prijava na brezplačno uvodno uro',
    '',
    `Ime:      ${ime}`,
    `E-pošta:  ${email}`,
    `Telefon:  ${tel || '—'}`,
    `Program:  ${program}`,
    `Termin:   ${termin}`,
    '',
    `Oddano:   ${new Date().toLocaleString('sl-SI', { timeZone: 'Europe/Ljubljana' })}`,
  ].join('\n');

  try {
    await posljiPosto(env, {
      from,
      to,
      replyTo: `${ime} <${email}>`,
      subject: `Uvodna ura: ${ime} — ${program}`,
      text: besedilo,
    });
  } catch (err) {
    console.error('Prijave ni bilo mogoče poslati:', err.message);
    return json(502, { ok: false, napaka: 'Prijave ni bilo mogoče poslati. Piši nam na info@gbdomzale.si.' });
  }

  // Potrditev prijavljenemu pošljemo šele, ko je domena potrjena pri Resend.
  let potrditev = false;
  if (env.MAIL_CONFIRM === 'on') {
    try {
      await posljiPosto(env, {
        from,
        to: email,
        replyTo: to,
        subject: 'Tvoja uvodna ura pri Gracie Barra Domžale',
        text: [
          `Živjo ${ime.split(' ')[0]},`,
          '',
          `prijava je zabeležena: ${program}, ${termin}.`,
          '',
          'S seboj prinesi športna oblačila in vodo, kimono ti posodimo.',
          'Naslov: Ljubljanska cesta 1, 1233 Dob.',
          '',
          'Če termin ne ustreza, samo odgovori na to sporočilo.',
          '',
          'Se vidimo na blazini,',
          'Gracie Barra Domžale',
        ].join('\n'),
      });
      potrditev = true;
    } catch (err) {
      console.error('Potrditvene pošte ni bilo mogoče poslati:', err.message);
    }
  }

  return json(200, { ok: true, potrditev });
}

const nedovoljeno = () => json(405, { ok: false, napaka: 'Metoda ni dovoljena.' });
export const onRequestGet = nedovoljeno;
export const onRequestPut = nedovoljeno;
export const onRequestDelete = nedovoljeno;
