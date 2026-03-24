// src/common/utils/likes.ts
export const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem("token"); // or your getToken()
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    return payload?.id || payload?._id || payload?.userId || null;
  } catch {
    return null;
  }
};
export const getLikesMetaFromApi = (
  r: { likes_by?: string[]; likes?: number },
  me: string | null
) => {
  const by = Array.isArray(r.likes_by) ? r.likes_by : [];
  const count = typeof r.likes === "number" ? r.likes : by.length;
  const likedByMe = !!(me && by.includes(me));
  return { count, likedByMe };
};
