const object = {
  /* a long long long long long long long long long long long long long long comment */ [b in B]: value,
  /* Multi
line */ [b in B]: value,
  /* short */ [b in B]: value,
  /* already on its own line */
  [b in B]: value,
  /* first */ /* second */ [c]: value,
  [/* inside */ d]: value,
  /* a long comment separated from its computed key by a nonbreaking space */ [anotherKey in obj]: value,
};
