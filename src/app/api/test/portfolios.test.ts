describe("/api/portfolios", () => {
	test("returns a list of portfolios", async () => {
		const response = await fetch("http://localhost:3000/api/portfolios");
		const mockResponse = {
			success: true,
			body: [
				{ id: 1, title: "Alice" },
				{ id: 2, title: "Bob" },
			],
		};
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(mockResponse);
	});
});
