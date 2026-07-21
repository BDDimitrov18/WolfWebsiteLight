/**
 * Direct form delivery via Web3Forms (owner's account key, 2026-07-21).
 * The site is static, so a form backend receives the POST and forwards
 * it to the owner's inbox. The visitor's `email` field automatically
 * becomes the reply-to address.
 *
 * Returns true only on a confirmed delivery — callers fall back to the
 * old mailto compose when this returns false, so an outage of the form
 * service never loses an inquiry. Set the key to "" to disable direct
 * sending entirely (forms revert to mailto).
 */
export const WEB3FORMS_KEY = "4479c677-68b7-4bdb-a8ef-73a530ee6dcf";

export async function sendInquiry(
  subject: string,
  fields: Record<string, string>,
): Promise<boolean> {
  if (!WEB3FORMS_KEY) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "Wolf Website",
        botcheck: "",
        ...fields,
      }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
