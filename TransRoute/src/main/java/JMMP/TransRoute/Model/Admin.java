package JMMP.TransRoute.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
public class Admin {
	
	@Id
	private String Id;
	
	@DBRef
	private User userId;

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}
}
